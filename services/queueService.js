const AuthTokenDAO = require('../DAOs/AuthTokenDAO.js')
const StoryDAO = require('../DAOs/StoryDAO.js')
const HashtagDAO = require('../DAOs/HashtagDAO.js')

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
  
    const addToQueue = async ({ handle, statusId, status, attachments, timestamp }) => {

        // let authTokenDAO = new AuthTokenDAO();
        // let compareTokenResult = await authTokenDAO.checkForAuthToken(this.authToken, this.status.author);
        // // If invalid token
        
        // if (parseInt(compareTokenResult.Count) != 1) {  
        //     return JSON.stringify({message: "Invalid token signature. Login to post a status"});
        // }

        const params = {
    //   DelaySeconds: 10,
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
    },
      MessageBody: status,
      // MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
      // MessageId: "Group1",  // Required for FIFO queues
      QueueUrl: "https://sqs.us-west-2.amazonaws.com/180432892517/receivePosts"
    };
     
     await sendMessage(params);
     
     this.findHashtags().then(async (hashtags) => {
            console.log("inside this.findHashtags");
            if (hashtags.length == 0) return;
            console.log("hashtags", hashtags);
            const hashtagDAO = new HashtagDAO();
            let addHashtagResponse = await hashtagDAO.addHashtag(this.status, hashtags)
            console.log("hashtagDAO.addHashtag()", addHashtagResponse);
            // let handles = data.handles;
        });
        
        const storyDAO = new StoryDAO();
            
        return storyDAO.addToStory(this.status);
        
    }
    
    const sendMessage = async (params) => {
        return new Promise((resolve, reject) => {
            sqs.sendMessage(params, function(err, data) {
                if (err) reject(err);
                else resolve(data);
            });
        })
        
    }
    
    findHashtags() {
        return new Promise((resolve, reject) => {
        var eachWordArray = this.status.statusText.split(" ");
            
            let userMentions = [];
            let hashtagMentions = [];
            
            for (var i = 0; i < eachWordArray.length; i++) {
                
                if (eachWordArray[i].startsWith('@')) {
                    userMentions.push(eachWordArray[i]);
                } else if (eachWordArray[i].startsWith('#')) {
                    // if (eachWordArray.charAt(eachWordArray[i].length-1) == ".")
                    hashtagMentions.push(eachWordArray[i]);
                }
            }

            resolve(hashtagMentions);
        });
    }  
    
}

module.exports = service;