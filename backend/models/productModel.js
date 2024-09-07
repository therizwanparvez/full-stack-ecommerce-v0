const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required. Please enter product Name"],
    },
    description: {
      type: String,
      required: [
        true,
        "Description is required. Please enter product Description",
      ],
    },
    price: {
      type: Number,
      required: [true, "Price is required. Please enter product Price"],
    },
    category: {
      type: String,
      required: [true, "Category is required. Please enter product Category"],
    },
    stock: {
      type: Number,
      default: 1,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
