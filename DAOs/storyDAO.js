
const { query, putItem } = require('./dbOperations');
const globalParams = { TableName : "Story" }

/**** Exportable functions below ****/
const addToStory = ({handle = "", timestamp = "", statusId = "", status = "", attachments = [] } = {}) => {

    const params = {
        ...globalParams,
        Item:{
            handle: {
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
    };

    return putItem(params);
}

const getStory = ({handle = '', lastkey = '', pagesize = 20}) => {
    
    let params = {
        ...globalParams,
        KeyConditionExpression: "handle = :handle",
        ExpressionAttributeValues: {
            ":handle": { S: handle }
        },
        ScanIndexForward: false,
        Limit: pagesize
    };
    
    if (lastkey && lastkey !== "first") {
        params.ExclusiveStartKey = { handle, timestamp: lastkey}; 
    }

    return query(params);
}

exports.getStory = getStory;
exports.addToStory = addToStory;