const express = require("express");
const cookieParser = require("cookie-parser");

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", product);
app.use("/api", user);

app.use(errorMiddleware);

module.exports = app;
