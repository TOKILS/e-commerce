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
  });

module.exports = Cart;
