"use strict";

POSTGRES_URI = process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");

const DATABASE_CONFIG = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(POSTGRES_URI, DATABASE_CONFIG);


const messageSchema = require("./module/message-schema.js");
const messageModel = messageSchema(sequelize, DataTypes);


module.exports = {
  messageModel,
}