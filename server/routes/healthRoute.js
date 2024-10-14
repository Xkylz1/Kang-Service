const express = require("express");
const router = express.Router();

// Health Check Route
router.get("/", (req, res) => {
  res.status(200).json({
    status: "Succeed",
    message: "Ping successfully",
    isSuccess: true,
  });
});

module.exports = router;
