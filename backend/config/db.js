const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log(`MongoDB connected to: ${data.connection.host}`);
  });
};

module.exports = connectDB;
