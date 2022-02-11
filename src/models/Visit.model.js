const mongoose = require('mongoose');
const visitSchema = require('../schemas/visit.schema');

const Visit = mongoose.model("visit", visitSchema);

module.exports = Visit;