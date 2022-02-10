const axios = require('axios');
const UrlChecker = require('../models/UrlChecker.model');
// @ desc       URL Monitoring
// @ route      GET api/v1/monitoring
// @ access     Private

exports.monitoring = async(req, res, next)=>{
    const {url} = req.body;
    try {
        const urlToCheck = await UrlChecker.findOne({URL: url})
        if(!urlToCheck){
            res.json({msg: `This URL ${url} isn't found in your Checks`});
        }else {

            // Check On URL Owner
            if(urlToCheck.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${urlToCheck.createdBy} is not authorized to GET this URL`});
            }
            axios.get(url)
            .then(response => {

            const instance = axios.create()

            // intercept Request
            instance.interceptors.request.use((config) => {
                config.headers['request-startTime'] = process.hrtime()
                return config
            })

            // intercept Response
            instance.interceptors.response.use((response) => {
                const start = response.config.headers['request-startTime']
                const end = process.hrtime(start)
                const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
                response.headers['request-duration'] = milliseconds
                return response
            })

            instance.get(url).then((response) => {
                console.log("** Response Time", response.headers['request-duration'])
                console.log("** Response Status", response.status);
                const monitoringData = {
                    Successful: true,
                    msg:"Url is Up",
                    responseStatus: response.status,
                    responseTime: `${response.headers['request-duration']} milliseconds`,
                    //responseData: response.data
                }
                res.json(monitoringData);
                //console.log("** Response Data", response.data);
            }).catch((error) => {
                console.error(`Error`)
            })
    
        })
        .catch(error => {
            //console.log(error);
            if(error.status == null){
                const monitoringData = {
                    Successful: false,
                    msg:"Url is Down",
                    responseStatus: "UNKNOWN",
                    responseTime: "UNKNOWN",
                    //responseData: "UNKNOWN"
                }
                res.json(monitoringData);
            }
            
        });
        }
        
      } catch (error) {
          console.log(error);
      }
}