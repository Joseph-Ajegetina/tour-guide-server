const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String, 
      required: [true, "Description is required"],
    },
    image: String,
    rating: Number, 
    price: Number, 
    duration: String, 
    category: String, 
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: [true, "Location is required."],
    },
    inclusions: [String],
    requirements: [String], 
  },
  {
    timestamps: true,
  }
);

const Activity = model("Activity", activitySchema);

module.exports = Activity;
