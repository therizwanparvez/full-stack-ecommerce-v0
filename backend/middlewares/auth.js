const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Please login to access this resource"));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodeData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resouce`
        )
      );
    }
    next();
  };
};
