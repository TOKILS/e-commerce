"use strict";
const POSTGRES_URI = process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_CONFIG = {
  dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false,
      }
  }
}
var sequelize = new Sequelize(POSTGRES_URI, DATABASE_CONFIG);
const Collection = require("./collection-class");

const cart = require("./cart/cart");
const address = require("./order/address"); 
const order = require("./order/order");
const orderDetails = require("./order/orderDetails");
const category = require("./product/category");
const product = require("./product/product");
const reviews = require("./product/reviews");
const type = require("./product/type");
const wishlist = require("./wishlist/wishlist");
const user = require("./user");

const cartModel = cart(sequelize, DataTypes);
const addressModel = address(sequelize, DataTypes);
const orderModel = order(sequelize, DataTypes);
const orderDetailsModel = orderDetails(sequelize, DataTypes);
const categoryModel = category(sequelize, DataTypes);
const productModel = product(sequelize, DataTypes);
const reviewsModel = reviews(sequelize, DataTypes);
const typeModel = type(sequelize, DataTypes);
const wishlistModel = wishlist(sequelize, DataTypes);
const userModel = user(sequelize, DataTypes);

// wishList ----------------------------------------
productModel.hasMany(wishlistModel, {
  sourceKey: "id",
  foreignKey: "ProductID",
});
wishlistModel.belongsTo(productModel, {
  foreignKey: "ProductID",
  targetKey: "id",
});

userModel.hasMany(wishlistModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
wishlistModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});

// Cart ----------------------------------------
productModel.hasMany(cartModel, {
  sourceKey: "id",
  foreignKey: "ProductID",
});
cartModel.belongsTo(productModel, {
  foreignKey: "ProductID",
  targetKey: "id",
});

userModel.hasMany(cartModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
cartModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});

// Reviews ----------------------------------------
productModel.hasMany(reviewsModel, {
  sourceKey: "id",
  foreignKey: "ProductID",
});
reviewsModel.belongsTo(productModel, {
  foreignKey: "ProductID",
  targetKey: "id",
});

userModel.hasMany(reviewsModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
reviewsModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});
// Address ----------------------------------------

userModel.hasMany(addressModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
addressModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});

// Order ----------------------------------------

userModel.hasMany(orderModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
orderModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});
// OrderDetails ----------------------------------------

userModel.hasMany(orderDetailsModel, {
  sourceKey: "id",
  foreignKey: "UserID",
});
orderDetailsModel.belongsTo(userModel, {
  foreignKey: "UserID",
  targetKey: "id",
});
productModel.hasMany(orderDetailsModel, {
  sourceKey: "id",
  foreignKey: "ProductID",
});
orderDetailsModel.belongsTo(productModel, {
  foreignKey: "ProductID",
  targetKey: "id",
});
orderModel.hasMany(orderDetailsModel, {
  sourceKey: "id",
  foreignKey: "OrderID",
});
orderDetailsModel.belongsTo(orderModel, {
  foreignKey: "OrderID",
  targetKey: "id",
});

// Product ----------------------------------------
typeModel.hasMany(productModel, {
  sourceKey: "id",
  foreignKey: "TypeID",
});
productModel.belongsTo(typeModel, {
  foreignKey: "TypeID",
  targetKey: "id",
});

// Type ----------------------------------------
categoryModel.hasMany(typeModel, {
  sourceKey: "id",
  foreignKey: "CategoryID",
});
typeModel.belongsTo(categoryModel, {
  foreignKey: "CategoryID",
  targetKey: "id",
});

const cartCollection = new Collection(cartModel);
const addressCollection = new Collection(addressModel);
const orderCollection = new Collection(orderModel);
const orderDetailsCollection = new Collection(orderDetailsModel);
const categoryCollection = new Collection(categoryModel);
const productCollection = new Collection(productModel);
const reviewsCollection = new Collection(reviewsModel);
const typeCollection = new Collection(typeModel);
const wishlistCollection = new Collection(wishlistModel);

module.exports = {
  db: sequelize,
  Cart: cartCollection,
  Address: addressCollection,
  Order: orderCollection,
  OrderDetails: orderDetailsCollection,
  Category: categoryCollection,
  Product: productCollection,
  Reviews: reviewsCollection,
  Type: typeCollection,
  Wishlist: wishlistCollection,
  users: userModel,
};
