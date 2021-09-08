"use strict";

const Wishlist = (sequelize, DataTypes) =>
  sequelize.define("Wishlist", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Wishlist;
