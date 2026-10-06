const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const cloudinary = require("cloudinary");

const isCloudinaryUrl = (url = "") =>
  typeof url === "string" &&
  url.includes("res.cloudinary.com") &&
  !url.includes("localhost");

// Upload base64 / data-URI images to Cloudinary when creating/updating products.
// Existing Cloudinary { public_id, url } objects are kept as-is.
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

    if (typeof image === "object" && image !== null && isCloudinaryUrl(image.url)) {
      imagesLinks.push({
        public_id: image.public_id,
        url: image.url,
      });
      continue;
    }

    // Admin New Product sends FileReader data URLs (base64)
    const uploadSource =
      typeof image === "string"
        ? image
        : typeof image === "object" && image?.url
          ? image.url
          : null;

    if (!uploadSource || typeof uploadSource !== "string") {
      continue;
    }

    // Never persist localhost / Vite asset paths
    if (
      uploadSource.includes("localhost") ||
      uploadSource.includes("127.0.0.1") ||
      uploadSource.includes("/src/assets/")
    ) {
      continue;
    }

    const result = await cloudinary.v2.uploader.upload(uploadSource, {
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

  if (!req.body.images || (Array.isArray(req.body.images) && !req.body.images.length)) {
    return next(new ErrorHandler("Please upload at least one product image", 400));
  }

  req.body.images = await uploadImages(req.body.images);

  if (!req.body.images.length) {
    return next(new ErrorHandler("Image upload to Cloudinary failed", 400));
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

  // Only re-upload when new image data is sent (base64 / new files)
  if (req.body.images) {
    const uploaded = await uploadImages(req.body.images);
    if (uploaded.length) {
      req.body.images = uploaded;
    } else {
      delete req.body.images;
    }
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

  for (const image of product.images || []) {
    if (image.public_id && isCloudinaryUrl(image.url)) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }
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
