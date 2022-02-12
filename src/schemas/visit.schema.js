const {Schema} = require('mongoose');
const Monitor = require('../models/Monitor.model');
const Visit = require('../models/Visit.model');

// visits records every visit on specific URL 
const visitSchema = new Schema({
    visitedUrl: {
        type: String,
        required: [true, "Please add your visited URL"]
    },
    responseStatus:{
        type: Number,
        default: null
    },
    reponseDuration: {
        type: Number,
        default: 0
    },
    Successful: {
        type: Boolean,
        default: false
    },
    visitDate: {
        type: Date,
        default: Date.now()
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "user"},

},{
    timestamps:true
});

// visitSchema.pre('save', async function(){
//     const visits = await Visit.find({createdBy: this.createdBy});
//     let totalResponseTime = 0;
//     visits.forEach(visit => {totalResponseTime += visit.reponseDuration});
//     const averageResponseTime = totalResponseTime / visits.length;
//     await Monitor.updateOne({createdBy: this.createdBy, monitoredUrl: this.visitedUrl }, {averageResponseTime});
// });

module.exports = visitSchema;