const AWS = require("aws-sdk"),
    s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        region: "us-west-2"
    });

const putObject = (params) => {
    return new Promise((resolve, reject) => {
        s3.putObject(params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

const getObject = () =>
    new Promise((resolve, reject) => {     
        s3.getObject(params, function(err, data) {
            if (err) reject(err);
            else resolve(data.Body.toString('utf-8')); // Use the encoding necessary
        });
    });

exports.getObject = getObject;
exports.putObject = putObject;