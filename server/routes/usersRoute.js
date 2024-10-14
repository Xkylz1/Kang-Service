const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// API for getting all users data
router.get("/", userController.getAllUser);

// API for getting user data by id
router.get("/:id", userController.getUserById);

// API for deleting user data by id
router.delete("/:id", userController.deleteUserById);

// API for updating data by id
router.patch("/:id", userController.UpdateUserById);

// API for creating new user data
router.post("/", userController.createUser);

// API for creating a new technician
router.post("/technicians", userController.createTechnician); // Add this line

module.exports = router;
