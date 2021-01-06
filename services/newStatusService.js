const { addHashtag } = require("../DAOs/hashtagDAO");
const { addToStory } = require("../DAOs/storyDAO");
const { addToFeed } = require("../DAOs/feedDAO");
const { getUsersFollowingHandle } = require("../DAOs/followDAO");

const postStatus = async ( statusPost ) => {
    const { status = "", handle = "" } = statusPost;
    const promises = [];
    const hashtags = parseHashtags(status);

    // Associate the post with the hashtag's pool of posts
    while (hashtags.length) {
        promises.push( addHashtag(statusPost, hashtags.splice(0, 25)) );
    }
    
    // Add the post to the posting user's story
    promises.push( addToStory(statusPost) );

    // List the user's followers and add to their feeds 
    try {
        const { Items: followersToUpdate = [] } = await getUsersFollowingHandle({ handle });

        while( Array.isArray(followersToUpdate) && followersToUpdate.length ) {
            promises.push( 
                addToFeed( statusPost, followersToUpdate.splice(0,25) )
            );
            // Alternatively, you could call "addToQueue" instead of addToFeed
        }

        // let authToken = new AuthToken(this.authToken, this.status.author, moment().format('YYYY MM DD h:mm:ss a'));
        // let updateAuthTokenResult = await authTokenDAO.updateAuthToken(authToken);
    } catch (err) {
        console.log("Error while retrieving all followers of the posting user.", err);
        throw new Error("Error while retrieving all followers of the posting user.");
    }

    // return JSON.stringify({authToken: this.authToken});
    return Promise.all(promises)
}

const parseHashtags = (status = "") => {
    const regex = /(^|(?<= ))(#[\w-]+)/g;
    return status.match(regex) || [];
}

const addToQueue = async ({ handle, statusId, status, attachments, timestamp }, followers = []) => {

    // let authTokenDAO = new AuthTokenDAO();
    // let compareTokenResult = await authTokenDAO.checkForAuthToken(this.authToken, this.status.author);
    // // If invalid token
    
    // if (parseInt(compareTokenResult.Count) != 1) {  
    //     return JSON.stringify({message: "Invalid token signature. Login to post a status"});
    // }

    const params = {
        MessageAttributes: {
            "statusId": {
                DataType: "String",
                StringValue: statusId
            },
            "handle": {
                DataType: "String",
                StringValue: handle
            },
            "attachments": {
                DataType: "String",
                StringValue: JSON.stringify(attachments)
            },
            "timestamp": {
                DataType: "String",
                StringValue: timestamp
            },
            "followers": {
                DataType: "String",
                StringValue: JSON.stringify(followers)
            }
        },
        MessageBody: status,
        QueueUrl: "https://sqs.us-west-2.amazonaws.com/180432892517/receivePosts"
    };
        
    return sendMessage(params);
    
}

exports.postStatus = postStatus;