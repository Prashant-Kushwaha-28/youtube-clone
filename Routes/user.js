// Import required modules
const express = require('express');
const router = express.Router();

// Import controller for user-related logic
const UserController = require('../Controllers/user.js');

// Route: POST /signUp
// Description: Register a new user
router.post("/signUp", UserController.signUp);

// Route: POST /login
// Description: Login an existing user and issue JWT token
router.post('/login', UserController.signIn);

// Route: POST /logout
// Description: Logout the user by clearing the token cookie
router.post('/logout', UserController.logout);

// Export the router to use in the main server file
module.exports = router;
