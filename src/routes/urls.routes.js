const router = require('express').Router();
const { getAllURLs, addURL, getSingleURL, deleteURL, updateURL } = require('../controllers/urls.controller');


router.route('/').get(getAllURLs).post(addURL);
router.route('/:id').get(getSingleURL).put(updateURL).delete(deleteURL);


module.exports = router;