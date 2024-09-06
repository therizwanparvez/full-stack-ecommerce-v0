const express = require("express");
const product = require("./routes/productRoute");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());

// Middleware for Errors
app.use(errorMiddleware);

app.use("/api", product);

module.exports = app;
