const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const usersRoute = require("./routes/usersRoute.js");
const serviceRequestRoutes = require('./routes/serviceRequestRoute.js');
const { login, register } = require("./controller/authController.js");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for the port

// CORS configuration
const corsOptions = {
  origin: ['https://kangservices.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging middleware

// Health Check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Ping successfully",
    isSuccess: true,
  });
});

// API Routes
app.use("/api/v1/users", usersRoute);
app.use('/api/v1/serviceRequests', serviceRequestRoutes);
app.post("/api/login", login);
app.post("/api/register", register);

// 404 error handler
app.use((req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found!",
    isSuccess: false,
  });
});

// Global error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: "Something went wrong!",
    isSuccess: false,
    error: err.message,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
