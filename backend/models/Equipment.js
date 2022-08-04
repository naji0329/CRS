const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  voltage: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('equipment', EquipmentSchema);
