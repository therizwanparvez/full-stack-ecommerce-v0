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

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
  });
});
