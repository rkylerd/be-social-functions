const { query, putItem, deleteItem, batchWrite } = require('./dbOperations');
const globalParams = { TableName : "Follow" }

const getUsersFollowedBy = ({handle, lastkey, pagesize} = {}) => {
    let params = {
        ...globalParams,
        KeyConditionExpression: "followerID = :followerID",
        ExpressionAttributeValues: {
            ":followerID": { S: handle }
        },
        ScanIndexForward: false,
        Limit: pagesize
    };
    
    if (lastkey && lastkey !== "first") {
        params.ExclusiveStartKey = { 
            followerID: {
                S: handle
            }, 
            followeeID: {
                S: lastkey
            }
        }; 
    }

    return query(params);
}

const getUsersFollowingHandle = ({ handle, lastkey, pagesize } = {}) => {

    let params = {
        ...globalParams,
        IndexName: "followeeID-index",
        KeyConditionExpression: 'followeeID = :key',
        ExpressionAttributeValues: {
            ':key' : { S: handle }
        },
        ScanIndexForward: false
    };
    
    if (pagesize) {
        params.Limit = pagesize;
    }
    
    if (lastkey && lastkey != "first") {
        params.ExclusiveStartKey = { 
            followerID: {
                S: lastkey 
            }, 
            followeeID: {
                S: handle
            }
        }
    }

    return query(params);
}

const addToFollowing = (follower, followee) => {

    const params = {
        ...globalParams,
        Item:{
            followerID: {
                S: follower
            },
            followeeID: {
                S: followee
            }
        }
    };

    return putItem(params);
}

const removeFromFollowing = (follower, followee) => {

    const params = {
        ...globalParams,
        Key: {
            "followerID": {
                S: follower
            },
            "followeeID": {
                S: followee
            }
        }
    };
    
    return deleteItem(params);
}

const addManyRelationships = (relationships = []) => {
    if (!relationships) return;
    
    relationships = relationships.map(({followerID = "", followeeID = ""}) => {
        return {
            PutRequest: {
                Item: {
                    followerID: {
                        S: followerID
                    },
                    followeeID: {
                        S: followeeID
                    }
                }
            }
        };
    });
    
    const params = {
        RequestItems: {
            // 'Follow' -> TableName
            'Follow': relationships
        }
    };

    return batchWrite(params);
}

const deleteManyRelationships = (relationships = []) => {
    if (!relationships) return;
    
    relationships = relationships.map(({followerID = "", followeeID = ""}) => {
        return {
            DeleteRequest: {
                Key: {
                    followerID: {
                        S: followerID
                    },
                    followeeID: {
                        S: followeeID
                    }
                }
            }
        };
    });
    
    const params = {
        RequestItems: {
            // 'Follow' -> TableName
            'Follow': relationships
        }
    };

    return batchWrite(params);
}

exports.getUsersFollowedBy = getUsersFollowedBy;
exports.getUsersFollowingHandle = getUsersFollowingHandle;
exports.addToFollowing = addToFollowing;
exports.addManyRelationships = addManyRelationships;
exports.removeFromFollowing = removeFromFollowing;
exports.deleteManyRelationships = deleteManyRelationships;