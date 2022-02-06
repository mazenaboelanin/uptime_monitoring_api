const router = require('express').Router();
const { getAllUsers, addUser, getSingleUser } = require('../controllers/users.controller');


router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getSingleUser);


module.exports = router;