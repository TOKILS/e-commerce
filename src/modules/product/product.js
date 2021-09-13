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
    Discount: {
      type: DataTypes.INTEGER,
    },
    Size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    // all color and images in the same object
    ProductObj: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    // Image: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    // },
  });

module.exports = Product;
