const {Schema} = require('mongoose');

const urlCheckerSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add your Check Name"],
        unique: [true, "Check Name already taken"]
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
    createdBy:{
        type: Schema.Types.ObjectId, ref: "user"
    },

},{
    timestamps: true
});

module.exports = urlCheckerSchema;