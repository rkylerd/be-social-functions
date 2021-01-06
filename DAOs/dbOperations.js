// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
// For the parameter data types and explanations

const AWS = require('aws-sdk'),
    dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/**** Function that interact with DynamoDB below ****/
const query = (params) => {
    return new Promise((resolve, reject) => {
        dynamodb.query(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    })
};

const putItem = (params) => {
    if (!params) return;
    
    return new Promise((resolve, reject) => {
        dynamodb.putItem(params, function(err, data) {
            if (err) reject(err);
            else resolve("Successfully added to your story.");
        });
    })
};

const deleteItem = (params) => {
    return new Promise((resolve, reject) => {
        dynamodb.deleteItem(params, function(err, data) {
            if (err) reject(err);
            else resolve("Successfully removed " + params.Key.followeeID + " from your following.");
        });
    })
}

const batchWrite = (params) => {
    return new Promise((resolve, reject) => {
        dynamodb.batchWriteItem(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });  
    });
}

const updateItem = (params) => {
    return new Promise((resolve, reject) => {
        dynamodb.updateItem(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    })
}
exports.query = query;
exports.putItem = putItem;
exports.deleteItem = deleteItem;
exports.batchWrite = batchWrite;
exports.updateItem = updateItem;