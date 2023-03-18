const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: [true, "Please add the message text"],
        },
        to: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);

module.exports = mongoose.model("Message", messageSchema);
