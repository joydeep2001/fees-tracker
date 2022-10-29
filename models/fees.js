const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    // max: 11,
    // min: 11,
    required: true,
  },
  gurdianMobile: {
    type: Number,
    // max: 11,
    // min: 11,
    required: true,
  },
  paymentMode: {
    type: String,
    // max: 11,
    // min: 11,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  feesMonth: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
  },
  screenshotURL: {
    type: String,
  },
  verificationStatus: {
    type: String,
    default: "PENDING",
  },
});

module.exports = mongoose.model("feesSchema", feesSchema);
