const { User } = require('../models');

// Login function without password hashing
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username and password
    const user = await User.findOne({ where: { username, password } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with the user's details if credentials are valid
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Register function without password hashing
const register = async (req, res) => {
  const { username, name, password } = req.body;

  // Basic validation
  if (!username || !name || !password) {
    return res.status(400).json({ message: 'Username, name, and password are required.' });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user with plain text password
    const newUser = await User.create({
      username,
      name,
      password,
      role: 'user', // Default role for new users
    });

    // Respond with a success message and the new user's details
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, register };
