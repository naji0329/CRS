const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Customer = require('../../models/Customer');

// @route    POST api/users
// @desc     Create Customer
// @access   Public
router.post('/create', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    business_name,
    address,
    contact_name,
    contact_email_address,
    contact_phone_number
  } = req.body;

  try {
    let customer = new Customer({
      business_name,
      address,
      contact_name,
      contact_email_address,
      contact_phone_number
    });

    customer = await customer.save();

    res.json({ customer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/customers
// @desc     GET Customers
// @access   Public
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
