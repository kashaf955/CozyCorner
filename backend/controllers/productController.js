const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const cloudinary = require("cloudinary");

const uploadImages = async (imagesInput) => {
  let images = [];
  if (!imagesInput) return images;
  if (typeof imagesInput === "string") {
    images.push(imagesInput);
  } else if (Array.isArray(imagesInput)) {
    images = imagesInput;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (typeof image === "object" && image.url) {
      imagesLinks.push(image);
      continue;
    }
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  return imagesLinks;
};


exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  if (req.body.images) {
    req.body.images = await uploadImages(req.body.images);
  }
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = Number(req.query.limit) || 8;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
  });
});
// Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
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
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product: product,
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product: product,
  });
});

// Create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body || {};
  if (!rating || !productId) {
    return next(new ErrorHandler("Please provide rating and productId", 400));
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = Number(rating);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / reviews.length;
  product.numOfReviews = reviews.length;
  await product.findByIdAndUpdate(req.query.productId, { reviews, ratings, numOfReviews }, { validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "Review deleted successfully"
  });
});
