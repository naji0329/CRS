const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const MaintenanceePlanCheck = require('../../models/MaintenanceePlanCheck');

// @route    POST api/users
// @desc     Create Technicianlist
// @access   Public
router.post('/create', async (req, res) => {
  const {
    business,
    equipment,
    assignMainComponent,
    notesMainComponent,
    assignSecondaryComponent,
    notesSecondaryComponent
  } = req.body;

  try {
    let maintenanceePlanCheck = new MaintenanceePlanCheck({
      business,
      equipment,
      assignMainComponent,
      notesMainComponent,
      assignSecondaryComponent,
      notesSecondaryComponent
    });

    technicianlist = await maintenanceePlanCheck.save();

    res.json({ maintenanceePlanCheck });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
