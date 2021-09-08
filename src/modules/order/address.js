"use strict";

const Address = (sequelize, DataTypes) =>
  sequelize.define("Address", {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Company: {
      type: DataTypes.STRING,
    },
    Address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address2: {
      type: DataTypes.STRING,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostalCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Address;
