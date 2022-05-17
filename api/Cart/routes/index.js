const express = require("express");
const router = express.Router();
const CartController = require("../controller/CartController");

router.post("/add", CartController.addToCart);

module.exports = router;