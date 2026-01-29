const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    // Validation
    if (!name || !price || !category || inStock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, price, category, inStock'
      });
    }

    const product = await Product.create({
      name,
      price,
      category,
      inStock
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// @desc    Update product by ID
// @route   PUT /products/:id
// @access  Public
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, inStock } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, category, inStock },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// @desc    Delete product by ID
// @route   DELETE /products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
