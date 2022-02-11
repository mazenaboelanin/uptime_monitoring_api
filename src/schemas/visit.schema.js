const {Schema} = require('mongoose');

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
    uptime:{
        type: Number,
    },
    downtime: {
        type: Number,
    },
    Successful: {
        type: Boolean,
        default: false
    },
    visitDate: {
        type: Date,
        default: Date.now()
    },
    availability:{
        type: Number,

    },

    CreatedBy: { type: Schema.Types.ObjectId, ref: "user"}
},{
    timestamps:true
});



module.exports = visitSchema;