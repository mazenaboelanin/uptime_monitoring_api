const {Schema} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please add your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please add your second name"]
    },
    email:{
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "email already taken"]
    },
    password: {
        type: String, 
        required: [true, "Please add a Password"]
    },
    verified: {type: Boolean, default: false},
    phoneNumber: {
        type: Number,
        min: [11, "Please add a phone number of 11 numbers only"]
    },
    role:{
        type: String,
        enum: ["user" ,"admin"],
    },
},{
    timestamps:true
});



module.exports = userSchema;