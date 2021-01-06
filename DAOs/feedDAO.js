const { batchWrite, query } = require("./dbOperations");

const addToFeed = ({handle = "", timestamp = "", statusId = "", status = "", attachments = [] } = {}, followers = []) => {
    
    const statuses = followers.map(({followerID: { S: followerID = ""} = {} } = {}) => {
        return {
            PutRequest: {
                Item:{
                    handle: { // handle of the user owning the feed
                        S: followerID
                    },
                    author: { // handle of the posting user
                        S: handle
                    },
                    timestamp: {
                        S: timestamp
                    },
                    statusId: {
                        S: statusId
                    }, 
                    status: {
                        S: status   
                    },
                    attachments: {
                        M: attachments
                    }
                }
            }
        };
    });
    
    const params = {
        RequestItems: {
            'Feed': statuses
        }
    };

    return batchWrite(params);
}

const getFeed = ({ handle, lastkey, pagesize}) => {
    let params = {
        TableName : "Feed",
        KeyConditionExpression: "handle = :handle",
        ExpressionAttributeValues: {
            ":handle": {
                S: handle
            }
        },
        ScanIndexForward: false,
        Limit: pagesize
    };
    
    if (lastkey && lastkey != "first") {
        params.ExclusiveStartKey = { 
            handle: {
                S: handle
            }, 
            timestamp: {
                S: lastkey 
            } 
        } 
    }

    return query(params);
}

exports.addToFeed = addToFeed;
exports.getFeed = getFeed;
    