const axios = require('axios');
const UrlChecker = require('../models/UrlChecker.model');
const cron = require('node-cron');
const sendMail = require('../services/sendEmails');

// @ desc       URL Monitoring
// @ route      GET api/v1/monitoring
// @ access     Private
exports.monitoring = async(req, res, next)=>{
    const {url} = req.body;
    try {
        const urlToCheck = await UrlChecker.findOne({URL: url});
        if(!urlToCheck){
            res.json({msg: `This URL ${url} isn't found in your Checks`});
        }else {

            // Check On URL Owner
            if(urlToCheck.createdBy.toString() !== req.user._id.toString() ){
                res.json({success: false, msg: `User Id: ${urlToCheck.createdBy} is not authorized to GET this URL`});
            }

            let isUp;
            let sentMailDown = false;
            let sentMailUp = false;
            cron.schedule('* * * * * *', async()=>{
              console.log('Request every 1 sec');
          
              try {
                isUp = false;
          
                let monitoringData;
                // intercept Request
                axios.interceptors.request.use((config) => {
                    config.headers['request-startTime'] = process.hrtime()
                    return config
                }, (error) => {return Promise.reject(error)});
          
                // intercept Response
                axios.interceptors.response.use((response) => {
                    const start = response.config.headers['request-startTime']
                    const end = process.hrtime(start)
                    const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
                    response.headers['request-duration'] = milliseconds
                    return response
                }, (error) => {return Promise.reject(error)});
          
          
              const response = await axios.get(url);
              isUp = true;
              
              if(isUp){
                monitoringData = {
                  Successful: true,
                  msg:"Url is Up",
                  responseStatus: response.status,
                  responseTime: response.headers['request-duration'],
                  //responseData: response.data
                }
                console.log("** Response Time", response.headers['request-duration'])
                console.log("** Response Status", response.status);
                console.log(monitoringData);
                if(!sentMailUp){
                // Report Uptime
                sendMail(process.env.MAIL_SENDER, process.env.MAIL_SENDER_PASSWORD, [req.user.email], 'API Is UP', `<h1>API Is UP</h1> <p>You Can Access it Now <br> ${url}</p>`);
                sentMailUp = true;
                sentMailDown = false;
                }
          
          
                res.json(monitoringData);
              }
               
              } catch (error) {
                if(error.status == null){
                  if(!isUp){
                    monitoringData = {
                      Successful: false,
                      msg:"Url is Down",
                      responseStatus: "UNKNOWN",
                      responseTime: "UNKNOWN",
                      //responseData: "UNKNOWN"
                    }
                    console.log(monitoringData);
                    if(!sentMailDown){
                    // // Report Downtime
                    sendMail(process.env.MAIL_SENDER, process.env.MAIL_SENDER_PASSWORD, [req.user.email], 'API Is Down', `<h1>API Is Down</h1> <p>You have an Issue <br> ${url}</p>`);
                    sentMailDown = true;
                    sentMailUp = false;
                    res.json(monitoringData);
                    }
          
                  }
                  
                }
                 
              }
          
            });            


            
                
        }
        
      } catch (error) {
          console.log(error);
      }
}