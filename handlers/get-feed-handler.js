
const { getFeed } = require('./services/feedService');

exports.handler = async (request, event) => {
    const { handle = "", pagesize, lastkey = "" } = request || {};
    const params = {
        handle,
        pagesize: pagesize ? parseInt(pagesize) : undefined,
        lastkey
    };
    
    try {
        const { Items = []} = await getFeed(params);
        return {
            statusCode: 200,
            feed: Items.map(({
                    handle : { S: handle = "" } = {}, 
                    author: { S: author = "" } = {}, 
                    timestamp: { S: timestamp = "" } = {}, 
                    statusId: { S: statusId = "" } = {}, 
                    status: { S: status = "" } = {}, 
                    attachments: { S: attachments = [] } = {} 
                }={}) => {
                return { handle, status, author, timestamp, statusId, attachments }
            })
        };
    } catch(err) {
        return { 
            statusCode: 500,
            error: err.toString()
        }
    }
};

