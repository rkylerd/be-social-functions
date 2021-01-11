const { uploadProfilePhoto } = require("./services/profilePhotoService")

exports.handler = async (request, event) => {
    // let response = {
    //     statusCode: 403,
    //     body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    // };    
    
    // if (request.authToken == undefined || request.authToken == "") {
    //     return response;
    // }
    
    const { handle = "", type = "", binary } = request || {};
    const buffer = Buffer.from(binary.replace(/^data:image\/\w+;base64,/, ""),'base64');
    
    try {
        const response = await uploadProfilePhoto({ handle: `@${handle}`, type, file: buffer });
 
        return {
            statusCode: 200,
            response
        }
    } catch(err) {
        return {
            statusCode: 500,
            error: err.toString()
        }
    }
};