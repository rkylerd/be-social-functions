var AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

AWS.config.update({
    region: 'us-west-2',
});

// Create S3 service object

exports.handler = async (request, event) => {
    let response = {
        statusCode: 403,
        body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    };    
    
    if (request.authToken == undefined || request.authToken == "") {
        return response;
    }
    
    let responseString = "Successfully updated your profile photo";
    console.log("handle parameter", request);
    
    var params = {
      Body: request.file, 
      Bucket: "tweeter-profile-photos", 
      Key: request.handle,
      ACL: 'public-read'
    };

     let putObject = new Promise((resolve, reject) => {
            s3.putObject(params, function(err, data) {

                console.log("enter upload s3.upload");
                
                if (err) reject(err);
                else resolve(data);
            });
     });

    let res = await putObject;
    

    params = {
      Bucket: "tweeter-profile-photos", 
      Key: request.handle
    };
    
    let getObject = new Promise((resolve, reject) => {
           
        s3.getObject(params, function(err, data) {
            // Handle any error and exit
            if (err) reject(err);
            else resolve(data.Body.toString('utf-8')); // Use the encoding necessary
        });
     });

    let getResponse = await getObject;
    response = {
        statusCode: 200,
        body: request.authToken
    };
    
    return response;
    
};