const dotenv = require("dotenv");

const app = require("./app");
const connectDB = require("./config/db");

// Configure env
dotenv.config();

// Call to connect MongoDB
connectDB();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.messge}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
