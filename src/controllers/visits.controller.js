const Visit = require("../models/Visit.model");

// @ desc       Get All visits
// @ route      GET api/v1/users
// @ access     Private
exports.getAllVisits = async(req, res, next)=>{
    res.json({msg: "get All visit"});
}

// @ desc       Get Single Visit
// @ route      GET api/v1/visits/:id
// @ access     Private
exports.getSingleVisit = async(req, res, next)=>{

    res.json({msg: "get single visit"});
}
