const express = require('express');
const sellerController = require('../../controllers/sellers/sellerController');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/api/seller/create-catalog',auth, sellerController.createCatalog);

router.post('/api/seller/add-product', auth, sellerController.AddProduct);

router.get('/api/seller/orders', auth, sellerController.getOrders);

module.exports = router;


