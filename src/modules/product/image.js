"use strict";

const Image = (sequelize, DataTypes) =>
  sequelize.define("Image", {
    ColorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = Image;
