const router = require('express').Router();
const { getAllURLs, addURL, getSingleURL } = require('../controllers/urls.controller');


router.route('/').get(getAllURLs).post(addURL);
router.route('/:id').get(getSingleURL);


module.exports = router;