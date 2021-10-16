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
    ColorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SizeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

module.exports = Cart;
