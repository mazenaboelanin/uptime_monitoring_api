const mongoose = require('mongoose');
const monitorSchema = require('../schemas/monitor.schema');

const Monitor = mongoose.model("monitor", monitorSchema);

module.exports = Monitor;