const { User } = require("../models");
// const bcrypt = require('bcrypt');

// Function to get all user data
async function getAllUser(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // Default page = 1
        const limit = parseInt(req.query.limit) || 10; // Default limit = 10
        const skip = (page - 1) * limit; // Calculate records to skip

        const totalUsers = await User.count();
        const users = await User.findAll({
            offset: skip,
            limit: limit,
        });

        const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

        res.status(200).json({
            status: "Success",
            message: "Successfully obtained users data",
            isSuccess: true,
            data: {
                users,
                totalUsers,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get users data",
            isSuccess: false,
            error: error.message,
        });
    }
}

// Function to get user data by id
async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found with the provided ID",
                isSuccess: false,
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Successfully obtained user data",
            isSuccess: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to get user data",
            isSuccess: false,
            error: error.message,
        });
    }
}

// Function to delete user by id
async function deleteUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found with the provided ID",
                isSuccess: false,
            });
        }

        await user.destroy();

        res.status(200).json({
            status: "Success",
            message: "Successfully deleted user data",
            isSuccess: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to delete user data",
            isSuccess: false,
            error: error.message,
        });
    }
}

// Function to update user by id
async function updateUserById(req, res) {
    const { username, name, password, role } = req.body;
    const id = req.params.id;

    // Validate required fields
    if (!username || !name) {
        return res.status(400).json({
            status: "Failed",
            message: "Username and name are required.",
            isSuccess: false,
        });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found with the provided ID",
                isSuccess: false,
            });
        }

        // Update user fields
        user.username = username;
        user.name = name;
        // if (password) {
        //     // Hash the password if provided
        //     user.password = await bcrypt.hash(password, 10);
        // }
        user.password=password;
        user.role = role;

        await user.save();

        res.status(200).json({
            status: "Success",
            message: "Successfully updated user data",
            isSuccess: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to update user data",
            isSuccess: false,
            error: error.message,
        });
    }
}

// Function to create a new user
async function createUser(req, res) {
    const { username, password, name, role } = req.body;

    // Validate required fields
    if (!username || !password || !name) {
        return res.status(400).json({
            status: "Failed",
            message: "Username, password, and name are required.",
            isSuccess: false,
        });
    }

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "Username already exists",
                isSuccess: false,
            });
        }

        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user if the username doesn't exist
        const newUser = await User.create({
            username,
            password,
            name,
            role: role || "user", // Default role to 'user'
        });

        res.status(201).json({
            status: "Success",
            message: "Successfully added user data",
            isSuccess: true,
            data: { newUser },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Failed to add user data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    getAllUser,
    getUserById,
    deleteUserById,
    updateUserById,
    createUser,
};
