const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  business_name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact_name: {
    type: String,
    required: true
  },
  contact_email_address: {
    type: String,
    required: true
  },
  contact_phone_number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('customer', CustomerSchema);
