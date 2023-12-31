const {Schema, model} = require("mongoose")

const locationSchema = new Schema({
    country: {
        type: String, 
        required: [true, "Country is required."],
    }, 
    city: {
        type: String,
        required: [true, "Country is required."],
    }, 
    description: String,
    image: String
},
{timestamps: true},
)

const Location = model("Location", locationSchema)

module.exports = Location



