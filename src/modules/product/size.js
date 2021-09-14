"use strict";

const Size = (sequelize, DataTypes) =>
  sequelize.define("Size", {
    ColorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = Size;
