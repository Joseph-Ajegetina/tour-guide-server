const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    isAdmin: Boolean,
    phone: String,
    firstName: String, 
    lastName: String,
    image: String,
    bookings: {
      type: [Schema.Types.ObjectId],
      ref: "Activity"
    },
    wishlists: {
    type: [Schema.Types.ObjectId],
    ref: "Activity"
  },
 },
  {
    timestamps: true,
  }
   
  
);

const User = model("User", userSchema);

module.exports = User;