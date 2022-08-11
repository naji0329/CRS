const mongoose = require('mongoose');

const MainComponentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('maincomponent', MainComponentSchema);
