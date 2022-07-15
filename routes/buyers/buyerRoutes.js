const express = require("express");
const auth = require("../../middleware/auth");
const buyerController = require("../../controllers/buyers/buyerController");

const router = express.Router();

router.get("/api/buyer/list-of-sellers", auth, buyerController.sellersList);

router.get("/api/buyer/seller-catalog/:sellerId", auth, buyerController.getCatalog);

module.exports = router;
