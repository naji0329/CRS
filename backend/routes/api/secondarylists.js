const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
const AWS = require('aws-sdk');
const config = require('config');

const Secondarylist = require('../../models/Secondary');

const s3 = new AWS.S3({
  accessKeyId: config.get('AWS_S3_ACCESS_KEY_ID'),
  secretAccessKey: config.get('AWS_S3_SECRET_ACCESS_KEY')
});

// @route    POST api/users
// @desc     Create SecondaryList
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

          let secondarylist = new Secondarylist({
            description: fields.description,
            name: fields.name,
            file: data.Location
          });

          secondarylist = await secondarylist.save();
          res.json({ secondarylist });
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
