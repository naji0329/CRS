const mongoose = require('mongoose');

const SecondarySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  specialInstruction: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('secondary', SecondarySchema);
