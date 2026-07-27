const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require('../controllers/productController');
const router = express.Router();

router.get('/products', getAllProducts);
router.post('/product/new', createProduct);
router.put('/product/:id', updateProduct).delete('/product/:id', deleteProduct).get('/product/:id', getProductDetails);


module.exports = router;