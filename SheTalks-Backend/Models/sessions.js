const mongoose = require("mongoose");

const sessionsSchema = mongoose.Schema(
    {
        session: {
            type: String,
            required: [true, "Please add the session"],
        },
        userId: {
            type: String,
            required: [true, "Please add the user id"],
        },
    },
    {
        timestamps: true, // This will add createdAt and updatedAt fields to the schema
    }
);


module.exports = mongoose.model("sessions", sessionsSchema);

