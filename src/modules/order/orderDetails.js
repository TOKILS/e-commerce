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
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = OrderDetails;
