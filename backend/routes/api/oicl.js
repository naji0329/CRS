const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const AWS = require('aws-sdk');
const config = require('config');

const Secondarylist = require('../../models/Secondary');
const Oicl = require('../../models/Oicl');

const s3 = new AWS.S3({
  accessKeyId: config.get('AWS_S3_ACCESS_KEY_ID'),
  secretAccessKey: config.get('AWS_S3_SECRET_ACCESS_KEY')
});

// @route    POST api/oicl
// @desc     Create OICL
// @access   Public
router.post('/create', async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (files.file) {
        const oldpath = files.file.filepath;
        const cTimestamp = Date.now();
        const fileName = cTimestamp + path.extname(files.file.originalFilename);
        const fileStream = fs.readFileSync(oldpath);

        const params = {
          Bucket: 'uncut/crs', // pass your bucket name
          Key: fileName, // file will be saved as testBucket/contacts.csv
          Body: fileStream
        };

        s3.upload(params, async function (s3Err, data) {
          if (s3Err) throw s3Err;
          console.log(`File uploaded successfully at ${data.Location}`);

          let oicl = new Oicl({
            technicianId: fields.technicianId,
            planId: fields.planId,
            equipmentId: fields.equipmentId,
            mainComponentId: fields.mainComponentId,
            secondaryItemId: fields.secondaryItemId,
            description: fields.description,
            file: data.Location
          });

          oicl = await oicl.save();
          res.json({ oicl });
          return true;
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/maincomponentlists
// @desc     Get MainComponent Lists
// @access   Public
router.get('/get', async (req, res) => {
  try {
    const technicianId = req.query.technicianId;
    const planId = req.query.planId;
    const equipmentId = req.query.equipmentId;
    const mainComponentId = req.query.mainComponentId;
    const secondaryItemId = req.query.secondaryItemId;

    const search = {};
    if (technicianId) search.technicianId = technicianId;
    if (planId) search.planId = planId;
    if (equipmentId) search.equipmentId = equipmentId;
    if (mainComponentId) search.mainComponentId = mainComponentId;
    if (secondaryItemId) search.secondaryItemId = secondaryItemId;

    console.log(search);
    let oicl = await Oicl.findOne(search);

    if (oicl) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
