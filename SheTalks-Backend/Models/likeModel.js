const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type:  mongoose.Schema.ObjectId,
            ref: 'Post',
            required: true,
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);

module.exports = mongoose.model('Like', likeSchema);
