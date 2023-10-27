const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Activity = require("../models/Activity.model.js"); // Import your Activity model
const Location = require("../models/Location.model.js"); // Import your Location model


// 1. Get All Locations
router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all locations
    const allLocations = await Location.find();
    res.json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Get Activities by Location
router.get("/:id", async (req, res) => {

  const id = req.params.id;

  try {
    // Query the database to retrieve activities by location
    const activitiesByLocation = await Location.findById(id);
    res.json(activitiesByLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//3. Create a new location
router.post('/create', async (req, res) => {
    const  {country, city, image, description} = req.body

    const newLocation = new Location({ city, country, description, image})
    newLocation
        .save()
        .then ((createdLocation)=> {
            res.status(201).json(createdLocation)
        })
        .catch((error) =>{
            console.error(error)
            res.status(500).json ({message: "Server error"})
        })
        })
      

// 4. Update Location (requires authentication)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.json(updatedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", isAuthenticated, async (req,res) => {
  try {
    const deletedLocation = await Location.findByIdAndRemove(req.params.id)
    if (!deletedLocation) {
      return res.status(404).json ({message: "Location not found"})
    }
    res.json(deletedLocation)}
    catch(error) {
      console.error(error)
      res.status(500).json({message: "Server error"})
    }
  }
)



// Add more location routes as needed

module.exports = router;
