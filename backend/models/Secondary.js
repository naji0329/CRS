const mongoose = require('mongoose');

const SecondarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('secondary', SecondarySchema);
