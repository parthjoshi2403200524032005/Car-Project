const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    image: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    model: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    color: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    company: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    status: {
      type: mongoose.Schema.Types.String,
      enum: ["available", "sold", "reserved"],
      default: "available"
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    mileage: {
      type: mongoose.Schema.Types.Number
    },
    year: {
      type: mongoose.Schema.Types.Number
    },
    fuelType: {
      type: mongoose.Schema.Types.String
    },
    transmission: {
      type: mongoose.Schema.Types.String,
      enum: ["manual", "automatic"]
    },
    features: [
      {
        type: mongoose.Schema.Types.String
      }
    ],

    registrationNumber: {
      type: mongoose.Schema.Types.String
    },
    serviceHistory: [
      {
        date: { type: Date },
        description: { type: mongoose.Schema.Types.String }
      }
    ],

    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
CarSchema.pre('save', async function(next) {
  if (this.status === 'sold' && !this.owner) {
    next(new Error('Sold cars must have an owner'));
  } else {
    next();
  }
});

module.exports = mongoose.model("Car", CarSchema, "Car");
