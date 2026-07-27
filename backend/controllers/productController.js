const Product = require('../models/productmodel');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
// Create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});
// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    });
});
// Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404)); 
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        product: product,
    });
});
// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
         return next(new ErrorHandler('Product not found', 404));
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        product: product,
    });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true, product: product,
    });
});