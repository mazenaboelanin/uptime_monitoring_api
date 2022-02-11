const router = require('express').Router();
const { getAllVisits, getSingleVisit} = require('../controllers/visits.controller');
const { protect } = require('../middleware/auth');


router.route('/').get(protect, getAllVisits);
router.route('/:id').get(protect, getSingleVisit);


module.exports = router;