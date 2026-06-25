const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeItemCart,
a} = require("../Controller/cartController.js");

router.post("/add-to-cart", addToCart);
router.get("/get-cart", getCart);
router.patch("/cart/:id", updateCartQuantity);
router.delete("/cart/:id", removeItemCart);

module.exports = router;
