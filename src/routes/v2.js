"use strict";
const express = require("express");
const io = require('socket.io-client');
const dataModules = require("../modules/index.js");
const bearerAuth = require("../middleware/bearer.js");
const permissions = require("../middleware/acl.js");
const socket = io.connect(`http://localhost:3001/notify`);
const router = express.Router();
router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  console.log(modelName);
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});
router.get("/:model", bearerAuth, handleGetAll);
router.get("/:model/:id", bearerAuth, handleGetOne);
router.post("/:model", bearerAuth, permissions("create"), handleCreate);
router.put("/:model/:id", bearerAuth, permissions("update"), handleUpdate);
router.patch("/:model/:id", bearerAuth, permissions("update"), handleUpdate);
router.delete("/:model/:id", bearerAuth, permissions("delete"), handleDelete);
async function handleGetAll(req, res) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (error) {
    res.status(500).json("Record not Found");
  }
}
async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (error) {
    res.status(500).json("Record not Found");
  }
}
async function handleCreate(req, res) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    const modelName = req.params.model;
    if (modelName === 'Order') {
      socket.emit('Order', newRecord)
    }
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json("Record not Found");
  }

}
async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json("Record not Found");
  }
}
async function handleDelete(req, res) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);
  } catch (error) {
    res.status(500).json("Record not Found");
  }
}
module.exports = router;