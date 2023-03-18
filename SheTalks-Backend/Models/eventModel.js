const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add the event title"],
        },
        description: {
            type: String,
            required: [true, "Please add the event description"],
        },
        Counsoler: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);

module.exports = mongoose.model("Event", eventSchema);
