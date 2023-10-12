const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity.model"); // Import your Activity model
const Location = require("../models/Location.model"); // Import your Location model


// 1. Get All Locations
router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all locations
    const allLocations = await Activity.distinct("location");
    res.json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Get Activities by Location
router.get("/:location", async (req, res) => {
  const location = req.params.location;

  try {
    // Query the database to retrieve activities by location
    const activitiesByLocation = await Activity.find({ location });
    res.json(activitiesByLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//3. Create a new location
router.post('/create', async (req, res) => {
    const  {name, country, city} = req.body

    const newLocation = new Location({name, city, country})
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




// Add more location routes as needed

module.exports = router;
