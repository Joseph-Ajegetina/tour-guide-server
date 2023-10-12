const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: [true, "Activity is required."],
    },
    comment: {
      type: String,
      required: [true, "Review text is required."],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Rating is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
