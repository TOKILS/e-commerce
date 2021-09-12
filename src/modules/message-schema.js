"use strict";

const MessageSchema = (sequelize, DataTypes) =>
  sequelize.define("messages", {
    Message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoomID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = MessageSchema;
