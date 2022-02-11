const mongoose = require('mongoose');
const monitorSchema = require('../schemas/monitor.schema');

const Monitor = mongoose.model("visit", monitorSchema);

module.exports = Monitor;