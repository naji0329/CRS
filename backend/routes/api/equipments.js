const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Equipment = require('../../models/Equipment');

var formidable = require('formidable');
var fs = require('fs');
// @route    POST api/users
// @desc     Create SecondaryList
// @access   Public
router.post('/create', async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      let fileContent = '';
      if (files.file) {
        const oldpath = files.file.filepath;
        const buffer = fs.readFileSync(oldpath);
        fileContent = buffer.toString();
      }

      let equipment = new Equipment({
        businessName: fields.businessName,
        serialNumber: fields.serialNumber,
        description: fields.description,
        voltage: fields.voltage,
        brand: fields.brand,
        location: fields.location,
        model: fields.model,
        file: fileContent
      });

      equipment = await equipment.save();
      res.json({ equipment });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/equipments/getEquipmentDataByBusiness
// @desc     Get Equipment Data By Business
// @access   Public
router.post('/getEquipmentDataByBusiness', async (req, res) => {
  try {
    const equipment = await Equipment.find({
      businessName: req.body.business
    });
    res.json(equipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
