"use strict";

const OrderDetails = (sequelize, DataTypes) =>
  sequelize.define("OrderDetails", {
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
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });

module.exports = OrderDetails;
