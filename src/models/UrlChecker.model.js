const mongoose = require('mongoose');
const urlCheckerSchema = require('../schemas/urlChecker.schema');


const UrlChecker = mongoose.model("urlchecker", urlCheckerSchema);

module.exports = UrlChecker;