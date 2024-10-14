require("dotenv").config(); // Load environment variables
const express = require("express");
const corsConfig = require("./middleware/corsConfig");
const logger = require("./middleware/logger");
const usersRoute = require("./routes/usersRoute");
const healthRoute = require("./routes/healthRoute");
const { login, register } = require("./controller/authController");

const app = express();
const port = process.env.PORT || 3000; // Load port from .env

// Middleware
app.use(express.json());
app.use(corsConfig); // Apply CORS
app.use(logger); // Apply logging

// Routes
app.use("/", healthRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/health", healthRoute); // Health check moved to /api/health
app.post("/api/login", login);
app.post("/api/register", register);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found!",
    isSuccess: false,
  });
});

// Centralized error handling (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Failed",
    message: "Internal Server Error",
    isSuccess: false,
    error: err.message,
  });
});

// Server listener
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
