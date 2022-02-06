const router = require('express').Router();
const { getAllUsers } = require('../controllers/users.controller');


router.route('/').get(getAllUsers);

module.exports = router;