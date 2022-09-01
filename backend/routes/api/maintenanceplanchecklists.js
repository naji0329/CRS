const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const MaintenanceePlanCheck = require('../../models/MaintenanceePlanCheck');
const Oicl = require('../../models/Oicl');

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

// @route    GET api/
// @desc     Create Technicianlist
// @access   Public
router.get('/getPlanForOicl', async (req, res) => {
  // try {
  const technicianId = req.query.technicianId;
  const planId = req.query.planId;
  let plan = await MaintenanceePlanCheck.findById(req.query.planId);

  for (let i = 0; i < plan.equipments.length; i++) {
    for (let j = 0; j < plan.equipments[i].mainComponentlists.length; j++) {
      const res1 = await OiclGet(
        technicianId,
        planId,
        plan.equipments[i]._id,
        plan.equipments[i].mainComponentlists[j]._id,
        null
      );

      plan.equipments[i].mainComponentlists[j].oicl = res1;
    }

    for (let j = 0; j < plan.equipments[i].secondaryLists.length; j++) {
      const res1 = await OiclGet(
        technicianId,
        planId,
        plan.equipments[i]._id,
        null,
        plan.equipments[i].secondaryLists[j]._id
      );

      plan.equipments[i].secondaryLists[j].oicl = res1;
    }
  }

  res.json(plan);
  // } catch (err) {
  //   console.error(err.message);
  //   res.status(500).send('Server error');
  // }
});

async function OiclGet(
  technicianId,
  planId,
  equipmentId,
  mainComponentId,
  secondaryItemId
) {
  try {
    const search = {};
    if (technicianId) search.technicianId = technicianId;
    if (planId) search.planId = planId;
    if (equipmentId) search.equipmentId = equipmentId;
    if (mainComponentId) search.mainComponentId = mainComponentId;
    if (secondaryItemId) search.secondaryItemId = secondaryItemId;

    let oicl = await Oicl.findOne(search);
    return oicl;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = router;
