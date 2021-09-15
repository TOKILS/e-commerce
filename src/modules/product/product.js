"use strict";

const Product = (sequelize, DataTypes) =>
  sequelize.define("Product", {
    TypeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    Discount: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Product;
