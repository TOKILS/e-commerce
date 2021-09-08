'use strict';

require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users/users.js');
const food = require('./food/food');
const Collection = require('./lib/data-collection');

const DATABASE_URL = process.env.DATABASE_URL;

const DATABASE_CONFIG = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
}

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
const foodModel = food(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);

const foodCollection = new Collection(foodModel);

module.exports = {
    db: sequelize,
    users: users,
    food: foodCollection,

}