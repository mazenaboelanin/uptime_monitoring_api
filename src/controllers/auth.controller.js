const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/sendEmails");

// @ desc       Register
// @ route      POST api/v1/auth/register
// @ access     Public
exports.register = async(req, res, next)=>{
    const {firstName,lastName,email,password,phoneNumber,role} = req.body;
    try {
        const user = await User.findOne({email});
        if (user){
            res.json({success: false, msg: "Email Already Exists"});
        } else {
                const newUser = new User({firstName,lastName,email,password,phoneNumber,role});
                const data = await newUser.save();

                // Create Token
                const token = newUser.getSignedJwtToken();

                // Email Verification
                sendMail(process.env.MAIL_SENDER, process.env.MAIL_SENDER_PASSWORD, [email], 'Email VERIFICATION', `<a href="http://localhost:3000/api/v1/auth/verify/${token}"> Click here Email Verification</a>`);

                res.json({success: true, msg: "User Created Successfully", data , token});
        }

    } catch (err) {
        res.json({success: false, err});
    }
}


// @ desc       Login
// @ route      POST api/v1/auth/login
// @ access     Public
exports.login = async(req, res, next)=>{
    const {email, password} = req.body;

    try {
        // validate on email and password
        if(!email || !password ){
            res.json({success: false, msg: `Please Enter email and password`});
        }
        const user = await User.findOne({email});
        if(user){
            const isPasswordMatch = await user.matchPassword(password);
            if(!isPasswordMatch){
                res.json({success: false, msg: `Invalid Credentials`});
            }else {
                // Create Token
                const token = user.getSignedJwtToken();
                res.json({success: true, msg: "Logged in Successfully", user: user._id , token});
            }
        }else {
            res.json({success: false, msg: `No User found with this email: ${email}`});
        }
        
    } catch (err) {
        res.json({success: false, err});
    }
}



// @ desc       verify email
// @ route      GET api/v1/auth/verify/:token
// @ access     Public

exports.verify = async (req, res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({_id: decoded.id});
    
    if (user){
        const updatedUser = await User.updateOne({_id: decoded.id}, {
            verified : true
        });
        res.json({success: true, msg: 'Email Verified Successfully', updatedUser});
    }else { 
        res.json({success: false, msg: "Not Verified"});
    }



}