const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
  },
  description: {
    type: String,
  },
  rent: {
    type: Number,
  },
  maintenance: {
    type: Number,
  },
  furnishing: {
    type: String,
  },
  deposit: {
    type: Number,
  },
  considering: {
    type: String,
  },
  location: {
    type: String,
  },
  distanceBusStop: {
    type: Number,
  },
  brokerNo: {
    type: String,
  },
  considered: {
    type: String,
  },
  visited: {
    type: String,
  },
  distanceOracle: {
    type: Number,
  },
  distanceFlipkart: {
    type: Number,
  },
  comments: {
    type: String,
  },
  area: {
    type: String,
  },
  gatedSecurity: {
    type: String,
  },
});

module.exports = mongoose.model('Property', PropertySchema);
