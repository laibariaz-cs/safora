// routes/userroutes.js
const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getAllUsers, deleteUser } = require('../controller/usercontroller');

// User Authentication and Management Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router;