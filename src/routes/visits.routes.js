const router = require('express').Router();
const { getAllVisits, getSingleVisit} = require('../controllers/visits.controller');


router.route('/').get(getAllVisits);
router.route('/:id').get(getSingleVisit);


module.exports = router;