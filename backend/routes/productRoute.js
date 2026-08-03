const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
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

module.exports = router;
