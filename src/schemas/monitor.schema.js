const {Schema} = require('mongoose');
// Monitor records every total visits on URL and get info for report
const monitorSchema = new Schema({
    monitoredUrl: {
        type: String,
        required: [true, "Please add your visited URL"]
    },
    currentResponseStatus:{
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
    createdBy: { type: Schema.Types.ObjectId, ref: "user"},
    visitIds:[{ type: Schema.Types.ObjectId, ref: "visit"}]

},{
    timestamps:true
});



module.exports = monitorSchema;