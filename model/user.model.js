const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarUserSchema = new Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    phone: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    dateOfBirth: {
      type: mongoose.Schema.Types.Date,
    },
    dateRegistered: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
    },
    profilePicture: {
      type: mongoose, // Assuming a URL to the picture
    },
    role: {
      type: mongoose.Schema.Types.String, // Or you can define roles in more detail
    },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }], // Assuming a reference to Car model
    Car_rating: {
      type: mongoose.Schema.Types.Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", CarUserSchema, "User");
