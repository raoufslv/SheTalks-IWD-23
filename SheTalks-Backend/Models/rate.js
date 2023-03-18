const mongoose = require("mongoose");

const rateSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        counsoler: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        rate: {
            type: Number,
            required: [true, "Please add the rate"],
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);

module.exports = mongoose.model("Rate", rateSchema);
