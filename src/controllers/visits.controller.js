const Visit = require("../models/Visit.model");

// @ desc       Get All visits
// @ route      GET api/v1/users
// @ access     Private
exports.getAllVisits = async(req, res, next)=>{
    try {
        const visits = await Visit.find();
        if(visits.length > 0 ){
            console.log('*** ', req.user._id.toString());
            // Return All Visits Owned By logged in User
            const visitsOwned = visits.filter(visit => visit.createdBy.toString() === req.user._id.toString());
            res.json({success: true, msg: "Get All visits", count: visitsOwned.length, visitsOwned});
        }else {
            res.json({success: false, msg: "No visits found"});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}

// @ desc       Get Single Visit
// @ route      GET api/v1/visits/:id
// @ access     Private
exports.getSingleVisit = async(req, res, next)=>{
    const {id} = req.params;
    try {
        const visit = await Visit.findById(id);
        if(visit){
            // Check On visit Owner
            if(visit.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${visit.createdBy} is not authorized to GET this URL`});
            }

            res.json({success: true, msg: "Get Single visit", visit});
        }else {
            res.json({success: false, msg: `No visit found with this ${id}`});
        }
    } catch (err) {
        res.json({success: false, msg: "Error", err});
    }
}
