const { User } = require("../models");

// Function for get all user data
async function getAllUser(req, res) {
    try {
        // Get 'page' and 'limit' from query parameters, with default values
        const page = parseInt(req.query.page) || 1; // Default page = 1
        const limit = parseInt(req.query.limit) || 10; // Default limit = 10
        
        const skip = (page - 1) * limit; // Calculate how many records to skip

        // Get total count of users (for pagination info)
        const totalUsers = await User.count(); // Assuming you use Sequelize, adjust if using a different ORM

        // Get the users for the current page with the specified limit
        const users = await User.findAll({
            offset: skip, // Skip the first 'skip' number of records
            limit: limit, // Limit the number of records returned
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            status: "Success",
            message: "Successfully obtained users data",
            isSuccess: true,
            data: {
                users,
                totalUsers, // Total number of users
                totalPages, // Total number of pages
                currentPage: page, // Current page
                limit, // Limit of users per page
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


// Function for get user data by id
async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id user",
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

// Function for delete user by id
async function deleteUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id user",
                isSuccess: false,
                data: null,
            });
        }

        await user.destroy();

        res.status(200).json({
            status: "Success",
            message: "Successfully delete user data",
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

// Function for update user by id
async function UpdateUserById(req, res) {
    const { username, name, password, role } = req.body;
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't find spesific id user",
                isSuccess: false,
                data: null,
            });
        }

        user.username = username;
        user.name = name;
        user.password = password;
        user.role = role;

        await user.save();

        res.status(200).json({
            status: "Success",
            message: "Successfully update user data",
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

async function createUser(req, res) {
    const { username, password, name, role } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "Username already exists",
                isSuccess: false,
                data: null,
            });
        }

        // Create a new user if the username doesn't exist
        const newUser = await User.create({ username, password, name, role });

        res.status(200).json({
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
    UpdateUserById,
    createUser,
};