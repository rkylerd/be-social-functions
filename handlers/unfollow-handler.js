const { unfollow } = require('./services/followService.js')

exports.handler = async (request, event) => {
    const { follower = "", followee = "" } = request || {};
    // let response = {
    //     statusCode: 403,
    //     body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    // };    
    
    // if (request.authToken == undefined || request.authToken == "") {
    //     return response;
    // }
    
    try {
        await unfollow({ follower, followee });
    
        return {
            statusCode: 200,
            body: `Successfully removed ${followee} from your following.`
        };
    } catch(err) {
        return {
            statusCode: 500,
            error: `Could not remove ${followee} from your following.`
        }
    }
};