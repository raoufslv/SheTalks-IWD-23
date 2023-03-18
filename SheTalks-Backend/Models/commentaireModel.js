const mongoose = require("mongoose");

const commentariesSchema = mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            required: true,
        },
        text: {
            type: String,
            required: [true, "Please add the commentary text"],
        },
        Anonyme: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);

module.exports = mongoose.model("Commentary", commentariesSchema);