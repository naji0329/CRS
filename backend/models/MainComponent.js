const mongoose = require('mongoose');

const MainComponentSchema = new mongoose.Schema({
  filter: {
    type: String,
    required: true
  },
  filterSize: {
    type: String,
    required: true
  },
  belt: {
    type: String,
    required: true
  },
  beltSize: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('maincomponent', MainComponentSchema);
