const {Schema} = require('mongoose');
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
        // will check > 0 when calculating avg responseTime
        default: -1
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
    monitor: {type: Schema.Types.ObjectId, ref: "monitor"}
},{
    timestamps:true
});



module.exports = visitSchema;