const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const User = require("../models/User.model.js"); // Import your User model
const Activity = require("../models/Activity.model.js")

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
})
  // Book Activity
  router.post("/:userId/booking/:activityId", isAuthenticated, async (req, res) => {
    const {userId, activityId}= req.params;
  
    if(!userId || !activityId){
      return res.status(500).json({message: "user id or activity id not provided"});
    }
  
    try{
      const user = await User.findById(userId);
      if (!user){
        return res.status(404).json({message: "User not found"})
      }

      const activity = await Activity.findById(activityId);
      if(!activity){
        res.status(404).json({messsage: "Activity does not exit"})
      }

      const bookings = [...user.bookings];
      //add new booking 

      bookings.push(activityId)

      user.bookings = bookings;
      user.save()
     return res.status(200).json(user)
    
    }catch(error){
      console.error(error)
      res.status(500).json({message: "Serer errror in booking"})
    }
})


// Add activity to wish list 
router.post("/:userId/wishlist/:activityId", isAuthenticated, async (req, res) => {
  const {userId, activityId}= req.params;

  if(!userId || !activityId){
    return res.status(500).json({message: "user id or activity id not provided"});
  }

  try{
    const user = await User.findById(userId);
    if (!user){
      return res.json.status(404).json({message: "User not found"})
    }

    const activity = await Activity.findById(activityId);
    if(!activity){
      res.status(404).json({messsage: "Activity does not exit"})
    }

    const wishlists = [...user.wishlists];
    //add new wishlist 

    wishlists.push(activityId)

    user.wishlists = wishlists;
    user.save()
   return res.status(200).json(user)
  
  }catch(error){
    res.status(500).json({message: "Serer errror in adding wishlist"})
  }
})

router.get('/wishlists/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('wishlists');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const wishlists = user.wishlists;
    res.json(wishlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/bookings/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate('bookings');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const bookings = user.bookings;
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;

