const User = require("../models/User.model");

// @ desc       Get All Users
// @ route      GET api/v1/users
// @ access     Private
exports.getAllUsers = async(req, res, next)=>{
    try {
        const users = await User.find();
        if(users.length > 0 ){
            res.json({success: true, msg: "Get All Users", count: users.length, users});
        }else {
            res.json({success: false, msg: "No Users found"});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}

// @ desc       Get Single User
// @ route      GET api/v1/users/:id
// @ access     Private
exports.getSingleUser = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(user ){
            res.json({success: true, msg: "Get Single user", user});
        }else {
            res.json({success: false, msg: `No user found with this ${id}`});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
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


// @ desc       Update User
// @ route      PUT api/v1/users/:id
// @ access     Private
exports.updateUser = async(req, res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;
    try {
        
        const user = await User.findById(id);
        if(user){
            const updatedUser = await User.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });
            res.json({success: true, msg: "User Updated Successfully", updatedUser});
        }else {
            res.json({success: false, msg: `No user found with this ${id}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}



// @ desc       Delete User
// @ route      DELETE api/v1/users/:id
// @ access     Private
exports.deleteUser = async(req, res, next)=>{
    const {id} = req.params;
    try {
        
        const user = await User.findById(id);
        if(user){
            const deletedUser = await User.deleteOne({id});
            res.json({success: true, msg: "User Deleted Successfully", deletedUser});
        }else {
            res.json({success: false, msg: `No user found with this ${id}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}