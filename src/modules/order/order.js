"use strict";

const Order = (sequelize, DataTypes) =>
  sequelize.define("Order", {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    AdressID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TotalPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    State: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });

module.exports = Order;
