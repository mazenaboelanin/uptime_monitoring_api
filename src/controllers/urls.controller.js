const UrlChecker = require("../models/UrlChecker.model");
const User = require("../models/User.model");

// @ desc       Get All URLs
// @ route      GET api/v1/urls
// @ access     Private
exports.getAllURLs = async(req, res, next)=>{
    try {
        const URLs = await UrlChecker.find();
        if(URLs.length > 0 ){
            res.json({success: true, msg: "Get All URLs", count: URLs.length, URLs});
        }else {
            res.json({success: false, msg: "No URLs found"});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}


// @ desc       Get Single URL
// @ route      GET api/v1/urls/:id
// @ access     Private
exports.getSingleURL = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const URL = await UrlChecker.findById(id);
        if(URL ){
            res.json({success: true, msg: "Get Single URL", URL});
        }else {
            res.json({success: false, msg: `No URL found with this ${id}`});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}


// @ desc       Add new URL
// @ route      POST api/v1/urls
// @ access     Private
exports.addURL = async(req, res, next)=>{
    const {name,URL, createdBy} = req.body;
    try {
        const user = await User.findById(createdBy);
        if (user){
            const url = await UrlChecker.findOne({name});
            if(url){
                res.json({success: false, msg: "URL Check Already Exists"});
            }else {
                const newURL = new UrlChecker({name,URL});
                const data = await newURL.save();
                
                // adding new URL to Specific User
                await User.updateOne({_id: createdBy}, {urlIds: [...user.urlIds, newURL._id]});
               
                res.json({success: true, msg: "URL Check Created Successfully", data});
            }

        }else {
            res.json({success: false, msg: `No User Found with this id: ${createdBy}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}




// @ desc       Update URL
// @ route      PUT api/v1/urls/:id
// @ access     Private
exports.updateURL = async(req, res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;
    try {
        
        const url = await UrlChecker.findById(id);
        if(url){
            const updateURL = await User.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });
            res.json({success: true, msg: "URL Check Updated Successfully", updateURL});
        }else {
            res.json({success: false, msg: `No URL Checker found with this ${id}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}



// @ desc       Delete URL
// @ route      DELETE api/v1/urls/:id
// @ access     Private
exports.deleteURL = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const url = await UrlChecker.findById(id);
        if(url){
            const deleteURL = await UrlChecker.deleteOne({id});

            res.json({success: true, msg: "URL Check Deleted Successfully", deleteURL});
        }else {
            res.json({success: false, msg: `No URL check found with this ${id}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}