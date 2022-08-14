const mongoose = require('mongoose');

const MaintenacePlanCheckSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  equipments: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'maintenaceplancheck',
  MaintenacePlanCheckSchema
);
