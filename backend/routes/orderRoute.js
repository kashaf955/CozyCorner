const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");
const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router.route("/order/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

module.exports = router;
