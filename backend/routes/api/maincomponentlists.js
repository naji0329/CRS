const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const MainComponent = require('../../models/MainComponent');

// @route    POST api/users
// @desc     Create MainComponent
// @access   Public
router.post('/create', async (req, res) => {
  const { type, name } = req.body;

  try {
    let mainComponent = new MainComponent({
      type,
      name
    });
    mainComponent = await mainComponent.save();
    res.json({ mainComponent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
