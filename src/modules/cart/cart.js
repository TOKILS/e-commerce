"use strict";

const Cart = (sequelize, DataTypes) =>
  sequelize.define("Cart", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    TotalPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

module.exports = Cart;
