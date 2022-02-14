const express = require('express');
const {addDeveloper, getAllDevelopers, getDeveloper, deleteDeveloper} = require('./controller');
// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/add').post(addDeveloper);
router.route('/all').get(getAllDevelopers);
router.route('/:id').get(getDeveloper);
router.route('/:id').delete(deleteDeveloper);

module.exports = router;
