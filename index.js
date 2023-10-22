require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// Middleware
app.use(express.json());

// Allowing cors
app.use(cors());

// Define your API routes here
app.use("/api/tasks", require("./routes/tasks"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
