const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required. Please enter your Name"],
      minLength: [4, "Name should have at least 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required. Please enter your Email"],
      unique: true,
      validate: [
        validator.isEmail,
        "Invalid email address. Please enter a valid Email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required. Please enter your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
