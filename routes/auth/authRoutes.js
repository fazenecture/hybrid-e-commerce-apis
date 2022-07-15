const express = require('express');
const bcrypt = require("bcryptjs");
const db = require('../../config/database');
const registerController = require('../../controllers/auth/registerController');
const loginController = require('../../controllers/auth/loginController');
const router = express.Router();

router.post('/api/auth/register', registerController.register );

router.post('/api/auth/login', loginController.login);

module.exports = router;


