const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const User = require("../models/User.model.js"); // Import your User model

// GET /api/users/profile - Get user profile (requires authentication)
router.get("/:userId", isAuthenticated, async (req, res) => {
  try {
    // Retrieve the user's profile 
    const userId = req.params.userId; //With the middleware
 // Query the database to fetch the user's profile
    const user = await User.findById(userId);
    if (!user) {
      // If the user does not exist, send a 404 Not Found response
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's profile as a JSON response
    res.json({ user });
  } catch (error) {
    // Handle errors, e.g., database errors or other exceptions
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Route to handle Updating the profile
router.put("/:userId", isAuthenticated, async(req,res) => {
  try {
    // Retrieve the user's ID from the authenticated token
    const {userId} = req.params
    // Retrieve the updated user data from the request body
    const {username, email, firstName, image, lastName, phone} = req.body
        // Find the user by their ID
    const user = await User.findById(userId)

    if (!user) {
      // If the user does not exist, send a 404 Not Found response
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile with the new data
    user.username = username;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.image = image
   

    // Save the updated user data to the database
    await user.save();

    // Return a success response
    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;

