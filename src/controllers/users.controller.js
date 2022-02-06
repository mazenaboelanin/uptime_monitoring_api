// @ desc       Get All Users
// @ route      GET api/v1/users
// @ access     Private
exports.getAllUsers = (req, res, next)=>{
    res.json({users: "GET ALL USERS"});
}