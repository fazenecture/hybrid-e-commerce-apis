const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../../config/database');
const sellerController = require('../../controllers/sellers/sellerController');
const auth = require('../../middleware/auth');

const app = express();
const router = express.Router();

router.post('/api/seller/create-catalog',auth, sellerController.createCatalog);

module.exports = router;


