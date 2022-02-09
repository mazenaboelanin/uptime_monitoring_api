const UrlChecker = require("../models/UrlChecker.model");
const User = require("../models/User.model");

// @ desc       Get All URLs
// @ route      GET api/v1/urls
// @ access     Private
exports.getAllURLs = async(req, res, next)=>{
    try {
        const URLs = await UrlChecker.find();
        if(URLs.length > 0 ){
            // Return All Urls Owned By logged in User
            const URLsOwned = URLs.filter(url => url.createdBy.toString() === req.user._id.toString());
           
            res.json({success: true, msg: "Get All URLs", count: URLsOwned.length, URLsOwned});
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
        const url = await UrlChecker.findById(id);
        if(url){
            // Check On URL Owner
            if(url.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${url.createdBy} is not authorized to GET this URL`});
            }

            res.json({success: true, msg: "Get Single URL", url});
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
                const newURL = new UrlChecker({name,URL, createdBy});
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
        let url = await UrlChecker.findById(id);
        if(url){
            console.log(req.user._id);
            console.log(url.createdBy);
            // Check On URL Owner
            if(url.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${url.createdBy} is not authorized to update this URL`});
            }

            url = await UrlChecker.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });

            res.json({success: true, msg: "URL Check Updated Successfully", url});
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
            
            console.log(req.user._id);
            console.log(url.createdBy);
            // Check On URL Owner
            if(url.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${url.createdBy} is not authorized to Delete this URL`});
            }
            const deleteURL = await UrlChecker.deleteOne({id});

            res.json({success: true, msg: "URL Check Deleted Successfully", deleteURL});
        }else {
            res.json({success: false, msg: `No URL check found with this ${id}`});
        }
        
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}