// @ desc       URL Monitoring
// @ route      GET api/v1/monitoring
// @ access     Private

exports.monitoring = (req, res, next)=>{
    res.json({msg: "Hello from Monitoring"});
}