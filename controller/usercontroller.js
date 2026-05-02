
// importing the user model/schema
const User = require('../models/user');


// API for registering a user
const registerUser = async (req, res) => {
    try {
        // getting data from body
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // create user
        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // check user
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for fetching all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            message: 'All users fetched successfully!',
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: error.message
        });
    }
};


// API for deleting a user (Admin use)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            deleteId: req.params.id
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// exporting all functions
module.exports = { registerUser, loginUser, getAllUsers, deleteUser };
