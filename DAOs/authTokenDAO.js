const { query, putItem, updateItem } = require("./dbOperations");

var dao = class AuthTokenDAO {

    // Used to get the last used info
    //also need an update token method below
    getToken(handle) {
      const params = {
          TableName : "AuthToken",
          IndexName: "handle-index",
          KeyConditionExpression: 'handle = :key',
          ExpressionAttributeValues: {
              ':key' : handle
          }
      };
      
      return query(params);
    }

    checkForAuthToken(tokenID, handle) {
        const params = {
            TableName : "AuthToken",
            KeyConditionExpression: 'tokenID = :tokenID and handle = :handle',
            ExpressionAttributeValues: {
                ':tokenID' : tokenID,
                ':handle' : handle
            }
        };
        
        return query(params);
    }
    
    addAuthToken(token) {

        if (token == undefined) return;

        const params = {
            TableName :"AuthToken",
            Item:{
                "tokenID": token.tokenID,
                "lastUsed": token.lastUsed,
                "handle": token.handle
            }
        };
        
        return putItem(params);
    }
    
    updateAuthToken(authToken) {
        const params = {
            TableName: "AuthToken",
            Key:{
                "tokenID": {
                    S: authToken.tokenID
                },
                "handle": {
                    S: authToken.handle
                }
            },
            UpdateExpression: "set lastUsed = :lastUsed",
            ExpressionAttributeValues:{
                ":lastUsed" : authToken.lastUsed
            }
        };
        
        return updateItem(params);
    }
            
}

exports.updateAuthToken = updateAuthToken;
exports.addAuthToken = addAuthToken;
exports.checkForAuthToken = checkForAuthToken;
exports.getToken = getToken;
