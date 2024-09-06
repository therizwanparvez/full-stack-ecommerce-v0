const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

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
