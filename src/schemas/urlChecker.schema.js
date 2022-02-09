const {Schema} = require('mongoose');
const url = require('url');
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


// Extract Protocol, Path, Port from Entered URL
urlCheckerSchema.pre('save', function(){
    const myUrl = new URL(this.URL);
    this.protocol = myUrl.protocol;
    this.path = myUrl.pathname;
    this.port = myUrl.port;
    console.log('********', `${this.protocol} - ${this.path} - ${this.port}`);
});

module.exports = urlCheckerSchema;