const router = require('express').Router();
const { monitoring, getAllMonitorsInfo, getSingleMonitorInfo } = require('../controllers/monitoring.controller');
const { protect } = require('../middleware/auth');


router.route('/').get(protect, monitoring);
router.route('/info').get(protect, getAllMonitorsInfo);
router.route('/info/:id').get(protect, getSingleMonitorInfo);


module.exports = router;