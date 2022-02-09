const router = require('express').Router();
const {register, login, verify, getMe} = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify/:token').get(verify);
router.route('/me').get(protect, getMe);


module.exports = router;