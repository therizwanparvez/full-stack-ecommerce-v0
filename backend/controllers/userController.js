const User = require("../models/userModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErros = require("../middlewares/catchAsyncErrors");

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

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});
