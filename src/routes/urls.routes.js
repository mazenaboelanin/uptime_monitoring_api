const router = require('express').Router();
const { getAllURLs, addURL, getSingleURL, deleteURL, updateURL } = require('../controllers/urls.controller');
const { protect } = require('../middleware/auth');


router.route('/').get(protect, getAllURLs).post(addURL);
router.route('/:id').get(protect, getSingleURL).put(protect, updateURL).delete(protect, deleteURL);


module.exports = router;