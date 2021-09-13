"use strict";

const express = require("express");
const dataModules = require("../modules/index.js");
const bearerAuth = require("../middleware/bearer.js");
const permissions = require("../middleware/acl.js");

const router = express.Router();

// reviews
router.get("/reviewsInfo/:id", bearerAuth, getProductReviewsInfo);
router.get("/reviews/:id", bearerAuth, getProductReviews);
// Products
router.get("/cartProducts/:id", bearerAuth, getProductFromCart);
router.get("/cartProductsInfo/:id", bearerAuth, getProductInfoFromCart);
// wishlist
router.get("/wishlistProducts/:id", bearerAuth, getProductFromWishlist);
router.get("/wishlistProductsInfo/:id", bearerAuth, getProductInfoFromWishlist);
// Order
router.get("/orderProducts/:id", bearerAuth, getProductFromOrder);
router.get("/orderProductsInfo/:id", bearerAuth, getProductInfoFromOrder);
// Address
router.get("/address/:id", bearerAuth, getUserAddress);
// Type
router.get("/type/:id", bearerAuth, getTypeProducts);
// Category
router.get("/category/:id", bearerAuth, getCategoryTypes);

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
    dataModules.Product
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
    dataModules.Product
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

module.exports = router;
