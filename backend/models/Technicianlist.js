const mongoose = require('mongoose');

const TechnicianlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('technicianlist', TechnicianlistSchema);
