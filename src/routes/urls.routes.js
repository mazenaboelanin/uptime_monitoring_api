const router = require('express').Router();
const { getAllURLs } = require('../controllers/urls.controller');


router.route('/').get(getAllURLs);


module.exports = router;