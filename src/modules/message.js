"use strict";

const Message = (sequelize, DataTypes) =>
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

module.exports = Message;
