"use strict";

const Type = (sequelize, DataTypes) =>
  sequelize.define("Type", {
    CategoryID: {
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
  });

module.exports = Type;
