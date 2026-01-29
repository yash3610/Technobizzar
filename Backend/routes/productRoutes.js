const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// POST new product
router.post('/', createProduct);

// PUT update product by ID
router.put('/:id', updateProduct);

// DELETE product by ID
router.delete('/:id', deleteProduct);

module.exports = router;
