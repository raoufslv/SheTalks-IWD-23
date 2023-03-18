const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add the post title"],
        },
        description: {
            type: String,
            required: [true, "Please add the post description"],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        Anonyme: {
            type: Boolean,
            required: [true, "Please add the post Anonyme"],
        },
        typeofPost: {
            enum: ["Article", "Post"],
            default: "Post",
            type: String,
            required: [true, "Please add the post typeofPost"],
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);


module.exports = mongoose.model("Post", postSchema);


        
        
    
