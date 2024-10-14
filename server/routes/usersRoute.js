const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Routes for user management
router.route("/")
  .get(userController.getAllUser)           // Get all users
  .post(userController.createUser);          // Create a new user

router.route("/:id")
  .get(userController.getUserById)          // Get user by ID
  .patch(userController.updateUserById)     // Update user by ID
  .delete(userController.deleteUserById);   // Delete user by ID

module.exports = router;
