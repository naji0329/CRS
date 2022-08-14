const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const MaintenanceePlanCheck = require('../../models/MaintenanceePlanCheck');

// @route    POST api/users
// @desc     Create Technicianlist
// @access   Public
router.post('/create', async (req, res) => {
  const { planName, business, equipments } = req.body;

  try {
    let maintenanceePlanCheck = new MaintenanceePlanCheck({
      planName,
      business,
      equipments
    });

    technicianlist = await maintenanceePlanCheck.save();

    res.json({ maintenanceePlanCheck });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/
// @desc     Create Technicianlist
// @access   Public
router.get('/getPlans', async (req, res) => {
  try {
    const plans = await MaintenanceePlanCheck.find();
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/
// @desc     Create Technicianlist
// @access   Public
router.get('/getPlan', async (req, res) => {
  try {
    const plan = await MaintenanceePlanCheck.findById(req.query.planId);
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
