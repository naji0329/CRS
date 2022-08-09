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
  equipment: {
    type: String,
    required: true
  },
  assignMainComponent: {
    type: String,
    required: true
  },
  notesMainComponent: {
    type: String,
    required: true
  },
  assignSecondaryComponent: {
    type: String,
    required: true
  },
  notesSecondaryComponent: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'maintenaceplancheck',
  MaintenacePlanCheckSchema
);
