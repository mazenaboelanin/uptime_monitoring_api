const router = require('express').Router();
const {register, login, verify} = require('../controllers/auth.controller');


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/verify/:token').get(verify);


module.exports = router;