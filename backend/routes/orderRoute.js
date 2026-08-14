const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const { newOrder } = require("../controllers/orderController.js");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;