const { follow } = require('./services/followService')

exports.handler = async (request, event) => {
    const { follower = "", followee = "" } = request || {};
    // let response = {
    //     statusCode: 403,
    //     body: JSON.stringify({message: "You do not have the authorization to perform that action."})
    // };    
    
    // if (request.authToken == undefined || request.authToken == "") {
    //     return response;
    // }
    
    const responseString = `Successfully added ${followee} to your following.`;
    try {
        // await generateRelationships();
        const queryResult = await follow({
            follower,
            followee
        });
        console.log("follow result", queryResult);
        return {
            statusCode: 200,
            body: responseString
        };
    } catch (err) {
        console.log('error from followHandler', err);
        return {
            statusCode: 500,
            error: err.toString()
        }
    }
};