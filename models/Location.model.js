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
    name: {
        type: String,
        required: [true, "Name is required"],
    },
},
{timestamps: true},
)

const Location = model("Location", locationSchema)

module.exports = Location



