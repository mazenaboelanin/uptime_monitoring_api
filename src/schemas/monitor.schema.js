const {Schema} = require('mongoose');

const monitorSchema = new Schema({
    monitoredUrl: {
        type: String,
        required: [true, "Please add your visited URL"]
    },
    responseStatus:{
        type: Number,
        default: null
    },
    averageResponseTime: {
        type: Number,
        default: 0
    },
    uptime:{
        type: Number,
    },
    downtime: {
        type: Number,
    },
    availability:{
        type: Number,
    },
    outages:{
        type: Number,
    },

},{
    timestamps:true
});



module.exports = monitorSchema;