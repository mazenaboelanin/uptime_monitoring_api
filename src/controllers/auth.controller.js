const User = require("../models/User.model");

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
                res.json({success: true, msg: "User Created Successfully", data , token});
        }

    } catch (err) {
        res.json({success: false, err});
    }
}


// @ desc       Login
// @ route      POST api/v1/auth/login
// @ access     Public
exports.login = async(req, res, next)=>{}
