const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Technicianlist = require('../../models/Technicianlist');

// @route    POST api/users
// @desc     Create Technicianlist
// @access   Public
router.post('/create', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phonenumber } = req.body;

  try {
    let technicianlist = await Technicianlist.findOne({ email });

    if (technicianlist) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Technician already exists' }] });
    }

    technicianlist = new Technicianlist({
      name,
      email,
      phonenumber
    });

    technicianlist = await technicianlist.save();

    res.json({ technicianlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const technicianlists = await Technicianlist.find();
    res.json(technicianlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/getTechnicianById/:id', async ({ params: { id } }, res) => {
  try {
    const technicianlist = await Technicianlist.findOne({
      _id: id
    });

    if (!technicianlist)
      return res.status(400).json({ msg: 'Profile not found' });

    return res.json(technicianlist);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const technicianlists = await Technicianlist.find();
    res.json(technicianlists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
