const dotenv = require("dotenv");

const app = require("./app");
const connectDB = require("./config/db");

// Configure env
dotenv.config();

// Call to connect MongoDB
connectDB();

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
