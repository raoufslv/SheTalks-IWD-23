const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add the first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add the last name"],
    },
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    phone: {
      type: String,
      required: [true, "Please add the user phone number"],
    },
    dateOfBirth: {
      type: Date,
      default: Date.now,
    },
    age: {
      type: Number,
      default: 10,
    },
    userType: {
      type: String,
      enum: ["Counselor", "user"],
      default: "user",
    },
    typeOfCounseling: {
      type: String,
      enum: ["Counseling", "Therapy"],
      default: "Counseling",
    },
    Rate: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    Avatar: {
      type: String,
      default: "default.jpg",
    },
  },

  {
    timestamps: true, // This will add createdAt and updatedAt fields to the schema
  }
);

module.exports = mongoose.model("User", userSchema);