const router = require('express').Router();
const { getAllVisits, getSingleVisit, getAllUnSuccessVisits, getAllSuccessVisits} = require('../controllers/visits.controller');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getAllVisits);
router.route('/:id').get(protect, getSingleVisit);
router.route('/info/success').get(protect, getAllSuccessVisits);
router.route('/info/unsuccess').get(protect, getAllUnSuccessVisits);


module.exports = router;