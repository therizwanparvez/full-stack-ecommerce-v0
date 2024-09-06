const express = require("express");
const product = require("./routes/productRoute");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());

app.use("/api", product);

app.use(errorMiddleware);

module.exports = app;
