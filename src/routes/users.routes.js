const router = require('express').Router();
const { getAllUsers, addUser } = require('../controllers/users.controller');


router.route('/').get(getAllUsers).post(addUser);

module.exports = router;