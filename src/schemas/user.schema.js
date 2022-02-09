const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        default: 'user'
    },
},{
    timestamps:true
});


// Hashing Password Before save
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10); 
    next();
});

// sign JWT Token
userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign(
        {id: this._id}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE} 
        );
}

// match user password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = userSchema;