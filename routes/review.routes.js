const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews.model");

// Create a new review
router.post("/", (req, res) => {
  const { rating, comment, userId, activityId } = req.body;

  // Create a new Review instance
  const newReview = new Review({ rating, comment, user: userId, activity: activityId });

  // Save the new review to the database
  newReview
    .save()
    .then((createdReview) => {
      res.status(201).json(createdReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

// Get all reviews for an activity by activityId
router.get("/activity/:activityId", async (req, res) => {
  try {
    const activityId = req.params.activityId;

    // Query the database to fetch all reviews for the specified activity
    const reviews = await Review.find({ activity: activityId });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a review by its ID
router.put("/:id", (req, res) => {
  const { rating, comment } = req.body;
  const reviewId = req.params.id;

  // Update the review by ID
  Review.findByIdAndUpdate(
    reviewId,
    { rating, comment },
    { new: true }
  )
    .then((updatedReview) => {
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(updatedReview);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

// Delete a review by its ID
router.delete("/:id", (req, res) => {
  const reviewId = req.params.id;

  // Delete the review by ID
  Review.findByIdAndDelete(reviewId)
    .then((deletedReview) => {
      if (!deletedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({ message: "Review deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
