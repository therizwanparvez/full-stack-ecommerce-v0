const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register an User
exports.registerUser = catchAsyncErros(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "user_avatar",
      url: "https://example.com/avatar/john.jpg",
    },
  });

  sendToken(res, user, 201, "User created successfully");
});

// Login User
exports.loginUser = catchAsyncErros(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter email & password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendToken(res, user, 200, "Logged in successfully");
});

// Logout
exports.logoutUser = catchAsyncErros(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErros(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  // Get Reset Password Token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(500, error.message));
  }
});
