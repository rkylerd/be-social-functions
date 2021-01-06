const { uploaProfilePhoto } = require("./services/profilePhotoService")

exports.handler = async (request, event) => {
    // let response = {
    //     statusCode: 403,
    //     body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    // };    
    
    // if (request.authToken == undefined || request.authToken == "") {
    //     return response;
    // }
    
    const responseString = "Successfully updated your profile photo";
    const { handle = "", imageType = "", profilPhotoBinary = "" } = request || {};
    
    try {
        await uploaProfilePhoto({ handle, imageType, binary: profilPhotoBinary });
        // Then you eed to upload the photo to the user table
        return {
            statusCode: 200,
            message: responseString
        }
    } catch(err) {
        return {
            statusCode: 500,
            error: err.toString()
        }
    }
};
    
    