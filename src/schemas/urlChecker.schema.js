const {Schema} = require('mongoose');

const urlCheckerSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add your Check Name"]
    },
    URL: {
        type: String,
        required: [true, "Please add your URL"]
    },
    protocol: {
        type: String
    },
    path: {
        type: String,
    },
    port: {
        type: String,
    },

},{
    timestamps: true
});

module.exports = urlCheckerSchema;