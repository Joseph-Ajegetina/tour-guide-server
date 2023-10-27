const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Activity = require("../models/Activity.model.js"); // Import your Activity model
const locationRoutes = require("./location.routes.js"); // Import location routes


// 1. Get All Activities
router.get("/", async (req,res) => {
    try {
        const activities = await Activity.find()
        res.json(activities)}

        catch(error) {
            console.error(error)
            res.status(500).json ({message: "Server error"})
        }
})

// 2. Get Activity by ID
router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 3. Create Activity (requires authentication)
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 4. Update Activity (requires authentication)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(updatedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 5. Delete Activity (requires authentication)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndRemove(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json(deletedActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// // 6. Filter Activities
router.get("/location/:id", async (req, res) => {
  const {id} = req.params

  if (!id) {
    return res.status(400).json({ message: 'locationId parameter is required' });
  }


  try {
    // Implement  filtering logic here 
    // Filter by location, price, duration, or category
    const filteredActivities = await Activity.find({location: id});
    res.json(filteredActivities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
