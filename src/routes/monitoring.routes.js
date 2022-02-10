const router = require('express').Router();
const { monitoring } = require('../controllers/monitoring.controller');
const { protect } = require('../middleware/auth');


router.route('/').get(protect, monitoring);


module.exports = router;