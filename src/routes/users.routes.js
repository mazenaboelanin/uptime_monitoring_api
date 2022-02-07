const router = require('express').Router();
const { getAllUsers, addUser, getSingleUser, updateUser, deleteUser } = require('../controllers/users.controller');


router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;