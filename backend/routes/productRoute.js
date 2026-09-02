const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.get("/products", getAllProducts);
router.post(
  "/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct,
);
router
  .put(
    "/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateProduct,
  )
  .delete(
    "/product/:id",
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteProduct,
  )
  router.route("/product/:id").get(getProductDetails);
  router.route("/review").put(isAuthenticatedUser, createProductReview);
  router.route("/reviews").get(getProductReviews);
  router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
  router.route("/products").get(getAllProducts);
module.exports = router;
