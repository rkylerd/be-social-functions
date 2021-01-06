const { query, putItem } = require("./dbOperations")

const checkCredentials = (handle, password) => {
      
    const params = {
        TableName : "User",
        KeyConditionExpression: 'handle = :key and password = :password',
        ExpressionAttributeValues: {
            ':key' : handle,
            ':password' : password
        }
    };
    
    return this.query(params);
}

const checkForUser = (handle) => {
    const params = {
        TableName : "User",
        KeyConditionExpression: 'handle = :key',
        ExpressionAttributeValues: {
            ':key' : handle
        }
    };
    
    return this.query(params);
}

const addUser = (user) => {
    if (user == undefined) return;

    const params = {
        TableName: "User",
        Item: {
            "handle": user.handle,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email
        }
    };
    
    return this.putItem(params);
}    

exports.addUser = addUser;
exports.checkForUser = checkForUser;
exports.checkCredentials = checkCredentials;

