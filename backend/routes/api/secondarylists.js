const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Secondarylist = require('../../models/Secondary');

var formidable = require('formidable');
var fs = require('fs');
// @route    POST api/users
// @desc     Create SecondaryList
// @access   Public
router.post('/create', async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      let secondarylist = new Secondarylist({
        description: fields.description,
        name: fields.name,
        file: ' '
      });

      secondarylist = await secondarylist.save();
      res.json({ secondarylist });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/maincomponentlists
// @desc     Get MainComponent Lists
// @access   Public
router.get('/', async (req, res) => {
  try {
    let secondarylists = await Secondarylist.find();
    res.json(secondarylists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
