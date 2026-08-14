const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const { newOrder, getSingleOrder } = require("../controllers/orderController.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;