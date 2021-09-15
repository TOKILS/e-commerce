"use strict";

const Category = (sequelize, DataTypes) =>
  sequelize.define("Category", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });

module.exports = Category;
