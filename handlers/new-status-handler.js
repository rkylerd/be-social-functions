// const sha256 = require('js-sha256');
// const uuid = require('uuid');
const { postStatus } = require("./services/newStatusService")

exports.handler = async (request, event) => {
    // let response = {
    //     statusCode: 403,
    //     body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    // };    
    
    // if (request.authToken == undefined || request.authToken == "") {
    //     return response;
    // }
    
    try {
        const { status = "", statusId = "", attachments = [], timestamp = "", handle = "" } = request || {};
        const resp = await postStatus({ status, statusId, attachments, timestamp, handle });
        console.log('postStatus resposne', resp);
        return {
            statusCode: 200,
            body: resp
        };
    } catch (err) {
        return {
            statusCode: 500,
            error: err.toString()
        };
    }
};