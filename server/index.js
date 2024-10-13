const morgan = require("morgan");
const express = require("express");
const usersRoute = require("./routes/usersRoute.js");
const { login, register } = require("./controller/authController.js");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-deployed-frontend.com"], // Allow both local and deployed frontends
  })
);


// Middleware Reading json from body (client)
app.use(express.json());

// middleware: LOGGINGG!! 3rd party package
app.use(morgan());

// Health Check
app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});

// Routes
app.use("/api/v1/users", usersRoute);



app.post("/api/login", login);
app.post("/api/register", register);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
