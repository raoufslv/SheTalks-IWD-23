const mongoose = require("mongoose");
const user = require("./userModel");

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add the post title"],
        },
        story: {
            type: String,
            required: [true, "Please add the post story"],
        },
        user_id: {
            // make it like a foreign key to the user table in the database (the user_id is the primary key in the user table)
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags:
        {
            type: [String],
            default: [],
        },
        feeling: {
            type: String,
            default: "Neutral",
        },

        anonymous: {
            type: Boolean,
            default: false,
        },
        typeofPost: {
            enum: ["Article", "Post"],
            type: String,
            default: "Post",
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);


module.exports = mongoose.model("Post", postSchema);


        
        
    
