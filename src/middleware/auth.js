const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

exports.protect = async(req, res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if Not Token
    if(!token){
        res.json({success: false, msg: `Unauthorized Access`});
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        const user = await User.findById(decoded.id);
        if(user){
            req.user = user;
            next();
        }else {
            res.json({success: false, msg: `Unauthorized Access`});
        }

    } catch (err) {
        res.json({success: false, err});
    }
};