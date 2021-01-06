const AWS = require('aws-sdk'),
    sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const sendMessage = (params) => {
    return new Promise((resolve, reject) => {
        sqs.sendMessage(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const sendMessageBatch = (params) => {
    return new Promise((resolve, reject) => {
        sqs.sendMessageBatch(params, function(err, data) {
            if (err) reject(err);
            else resolve(data); // successful response
        });
    });
}

exports.sendMessage = sendMessage;
exports.sendMessageBatch = sendMessageBatch;