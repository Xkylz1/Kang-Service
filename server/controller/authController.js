const { User } = require('../models');

// Login function that handles both users and technicians
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Attempt to find the user by username and password
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with the user's details if credentials are valid
    res.json({ user });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Register function for users
const register = async (req, res) => {
  const { username, name, password } = req.body;

  try {
    // Create a new user with plain text password
    const newUser = await User.create({
      username,
      name,
      password,
      role: 'user', // Default role for new users
    });

    // Respond with a success message and the new user's details
    res.json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, register };
