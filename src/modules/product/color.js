"use strict";

const Color = (sequelize, DataTypes) =>
  sequelize.define("Color", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = Color;
