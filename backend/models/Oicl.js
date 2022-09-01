const mongoose = require('mongoose');

const OiclSchema = new mongoose.Schema({
  technicianId: {
    type: String
  },
  planId: {
    type: String
  },
  equipmentId: {
    type: String
  },
  mainComponentId: {
    type: String
  },
  secondaryItemId: {
    type: String
  },
  file: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('oicl', OiclSchema);
