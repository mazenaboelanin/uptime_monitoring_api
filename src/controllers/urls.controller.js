const UrlChecker = require("../models/UrlChecker.model");

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