const { isInFollowing } = require("./services/followService");

exports.handler = async (request, event) => {
    const { follower = "", followee = "" } = request || {};
    try {
        const isFollowing = await isInFollowing({followingUser: follower, followedUser: followee});
        return {
            statusCode: 200,
            inFollowing: isFollowing
        }
    } catch(err) {
        response = {
            statusCode: 500,
            error: err.toString()
        };
    }
};