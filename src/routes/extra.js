"use strict";

const express = require("express");
const dataModules = require("../modules/index.js");
const bearerAuth = require("../middleware/bearer.js");
const permissions = require("../middleware/acl.js");
const { users } = require("../modules/index.js");

const router = express.Router();
//user

// reviews
router.get("/reviewsInfo/:id", getProductReviewsInfo);
router.get("/reviews/:id", getProductReviews);
// Products
router.get("/cartProducts/:id", getProductFromCart);
router.get("/cartProductsInfo/:id", getProductInfoFromCart);
router.get("/Products/:id", getProducts);
router.get("/Products", getProducts);
// wishlist
router.get("/wishlistProducts/:id", getProductFromWishlist);
router.get("/wishlistProductsInfo/:id", getProductInfoFromWishlist);
// Order
router.get("/orderProducts/:id", getProductFromOrder);
router.get("/orderProductsInfo/:id", getProductInfoFromOrder);
// Address
router.get("/address/:id", getUserAddress);
// Type
router.get("/type/:id", getTypeProducts);
// Category
router.get("/category/:id", getCategoryTypes);
// image
router.get("/image/:id", getImageByColorID);

//  Reviews Reviews Reviews Reviews Reviews Reviews
async function getProductReviewsInfo(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Reviews.getProductReviewsInfo(id);
  res.status(200).json(allRecords);
}

async function getProductReviews(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Reviews.getProductReviews(
    id,
    dataModules.users
  );
  res.status(200).json(allRecords);
}

//  Cart Cart Cart Cart Cart Cart Cart Cart
async function getProductFromCart(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Cart.getProductFromCart(
    id,
    dataModules.Product,
    dataModules.Color,
    dataModules.Size
  );
  res.status(200).json(allRecords);
}
async function getProductInfoFromCart(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Cart.getProductInfoFromCart(
    id,
    dataModules.Product
  );
  res.status(200).json(allRecords);
}
// Wishlist Wishlist Wishlist Wishlist Wishlist Wishlist Wishlist
async function getProductFromWishlist(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Wishlist.getProductFromWishlist(
    id,
    dataModules.Product
  );
  res.status(200).json(allRecords);
}

async function getProductInfoFromWishlist(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Wishlist.getProductInfoFromWishlist(
    id,
    dataModules.Product
  );
  res.status(200).json(allRecords);
}
// Order Order Order Order Order Order Order Order Order
async function getProductFromOrder(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Order.getProductFromOrder(
    id,
    dataModules.OrderDetails,
    dataModules.Product,
    dataModules.Color,
    dataModules.Size
  );
  res.status(200).json(allRecords);
}

async function getProductInfoFromOrder(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Order.getProductInfoFromOrder(
    id,
    dataModules.OrderDetails,
    dataModules.Product
  );
  res.status(200).json(allRecords);
}
// Address Address Address Address Address Address Address Address

async function getUserAddress(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Address.getUserAddress(id);
  res.status(200).json(allRecords);
}
// Type Type Type Type Type Type Type Type Type Type Type
async function getTypeProducts(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Product.getTypeProducts(id);
  res.status(200).json(allRecords);
}
// Category Category Category Category Category Category
async function getCategoryTypes(req, res) {
  const id = req.params.id;
  let allRecords = await dataModules.Type.getCategoryTypes(id);
  res.status(200).json(allRecords);
}
async function getProducts(req, res) {
  const id = req.params.id;

  let allRecords = await dataModules.Product.getProducts(
    id == undefined ? false : id,
    dataModules.Color,
    dataModules.Image,
    dataModules.Size
  );
  res.status(200).json(allRecords);
}

async function getImageByColorID(req, res) {
  const id = req.params.id;

  let allRecords = await dataModules.Image.getImageByColorID(id);
  res.status(200).json(allRecords);
}

module.exports = router;
