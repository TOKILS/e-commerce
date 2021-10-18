"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("../modules/index.js");
const signupCheck = require("../middleware/signupCheck");
const basicAuth = require("../middleware/basic.js");
const bearerAuth = require("../middleware/bearer.js");
const permissions = require("../middleware/acl.js");

authRouter.post("/signup", signupCheck, async (req, res, next) => {
  const userInfo = {
    id: req.user.id,
    username: req.user.username,
    password: req.user.password,
  };
  res.status(201).json(userInfo);
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    username: req.user.username,
    password: req.user.password,
    role: req.user.role,
    capabilities: req.user.capabilities,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.post("/userinfo/:id", async (req, res, next) => {
  const id = req.params.id;
  let user = await users.findOne({ where: { id: id } });

  res.status(200).json(user);
});

authRouter.put("/updateAccount", bearerAuth, async (req, res, next) => {
  const id = req.userId;
  let userRecord = await users.findOne({ where: { id: id } });
  const output = req.body;
  console.log("output =>", output);
  output.token = userRecord.token;
  const updateRecored = await userRecord.update(output);
  console.log("updated =>", updateRecored);
  res.send(updateRecored);
});

authRouter.delete("/deleteAccount", bearerAuth, async (req, res, next) => {
  const id = req.userId;

  await users.destroy({ where: { id: id } });

  res.send("Account Deleted");
});

authRouter.get(
  "/users",
  bearerAuth,
  permissions("delete"),
  async (req, res, next) => {
    try {
      const userRecords = await users.findAll({});
      const list = userRecords.map(
        (user) => `◼ ${user.username} 〰 ${user.role}`
      );
      res.status(200).json(list);
    } catch (e) {
      next(e.message);
    }
  }
);

authRouter.get("/secret", bearerAuth, async (req, res, next) => {
  const secretInfo = {
    secret: "Welcome to the secret area 🔐",
    user: req.user,
    token: `📌 ${req.token}`,
  };
  res.status(200).json(secretInfo);
});

authRouter.get("/allusers", async (req, res, next) => {
  try {
    let allRecords = await users.findAll({});
    let x = allRecords.map((ele) => ({
      id: ele.id,
      username: ele.username,
      firstname: ele.firstname,
      lastname: ele.lastname,
      email: ele.email,
      role: ele.role,
      createdAt: ele.createdAt,
      token: ele.token,
    }));

    res.status(200).json(x);
  } catch (e) {
    next(e.message);
  }
});
module.exports = authRouter;
