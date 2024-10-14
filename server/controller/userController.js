const { User } = require("../models");

// Function to get all user data
async function getAllUser(req, res) {
    try {
        const page = parseInt(req.query.page) || 1; // Default page = 1
        const limit = parseInt(req.query.limit) || 10; // Default limit = 10
        const skip = (page - 1) * limit; // Calculate records to skip

        // Get total count of users for pagination
        const totalUsers = await User.count();

        // Get users for the current page
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
            data: null,
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
                message: "Can't find specific user with the provided ID",
                isSuccess: false,
                data: null,
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
            data: null,
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
                message: "Can't find specific user with the provided ID",
                isSuccess: false,
                data: null,
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
            data: null,
            error: error.message,
        });
    }
}

// Function to update user by id
async function updateUserById(req, res) {
    const { username, name, password, role } = req.body;
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find specific user with the provided ID",
                isSuccess: false,
                data: null,
            });
        }

        // Update user fields
        user.username = username;
        user.name = name;
        user.password = password; // Consider not sending plain passwords
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
            data: null,
            error: error.message,
        });
    }
}

// Function to create a new user
async function createUser(req, res) {
    const { username, password, name, role } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "Username already exists",
                isSuccess: false,
                data: null,
            });
        }

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
            data: null,
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
