const { query, batchWrite } = require('./dbOperations');

const getStatusesWithHashtag = (hashtag) => {
    
    const params = {
        TableName : "Hashtag",
        Indexname: "hashtag-timestamp-index",
        KeyConditionExpression: 'hashtag = :key',
        ExpressionAttributeValues: {
            ':key' : { S: hashtag }
        },
        // ExclusiveStartKey: ,
        ScanIndexForward: false,
        Limit: 20
    };
    
    return query(params);
}

const addHashtag = ({ status, statusId, handle, attachments, timestamp } = {}, hashtags) => {
    
    if (!hashtags) return;
    console.log('hashtags', hashtags)
    console.log("status", {status, statusId, handle, attachments, timestamp})
    const statuses = hashtags.map(hashtag => {
        return {
            PutRequest: {
                Item: {
                    "handle-hashtag": {
                        S: `${handle}-${hashtag}`
                    },
                    hashtag: {
                        S: hashtag
                    },
                    statusId: {
                        S: statusId
                    },
                    handle: {
                        S: handle
                    },
                    status: {
                        S: status
                    },
                    attachments: {
                        M: attachments
                    },
                    timestamp: {
                        S: timestamp
                    }
                }
            }
        }
    });

    return addManyHashtags(statuses);
}

const addManyHashtags = (statuses) => {

    let params = {
        RequestItems: {
            'Hashtag': statuses
        }
    };

    return batchWrite(params);
}

exports.addManyHashtags = addManyHashtags;
exports.addHashtag = addHashtag;
exports.getStatusesWithHashtag = getStatusesWithHashtag;