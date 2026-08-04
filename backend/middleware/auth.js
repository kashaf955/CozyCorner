const usermodel = require("../models/usermodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await usermodel.findById(decoded.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found. Please login again", 401));
    }

    next();
});

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user?.role || "unknown"} is not allowed to access this resource`,
                    403
                )
            );
        }
        next();
    };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
