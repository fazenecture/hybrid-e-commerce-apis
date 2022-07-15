const express = require("express");
const auth = require("../../middleware/auth");
const buyerController = require("../../controllers/buyers/buyerController");

const router = express.Router();

router.get("/api/buyer/list-of-sellers", auth, buyerController.sellersList);

router.get("/api/buyer/seller-catalog/:sellerId", auth, buyerController.getCatalog);

router.post("/api/buyer/add-to-cart", auth, buyerController.addToCart);

router.post("/api/buyer/create-order/:sellerId", auth, buyerController.createOrder);

module.exports = router;
