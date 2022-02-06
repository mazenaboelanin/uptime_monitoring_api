const User = require("../models/User.model");

// @ desc       Get All Users
// @ route      GET api/v1/users
// @ access     Private
exports.getAllUsers = (req, res, next)=>{
    res.json({users: "GET ALL USERS"});
}

// @ desc       Add new User
// @ route      POST api/v1/users
// @ access     Private
exports.addUser = async(req, res, next)=>{
    const {firstName,lastName,email,password,phoneNumber,role} = req.body;
    try {
        
        const user = await User.findOne({email});
        if(user){
            res.json({success: false, msg: "Email Already Exists"});
        }else {
            const newUser = new User({firstName,lastName,email,password,phoneNumber,role});
            const data = await newUser.save();
           
            res.json({success: true, msg: "User Created Successfully", data});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}

