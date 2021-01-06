
const { getStory } = require('./services/storyService.js');

exports.handler = async (request, event) => {
    
    const params = {
        handle: request.handle,
        pagesize: request.pagesize ? parseInt(request.pagesize) : undefined,
        lastkey: request.lastkey
    };
    
    try {
        const { Items = [] } = await getStory(params);
        const response = {
            statusCode: 200,
            posts: Items.map(({ 
                handle: { S: handle = "" } = {}, 
                timestamp: { S: timestamp = "" } = {}, 
                statusId: { S: statusId = "" } = {}, 
                status: { S: status = "" } = {},
                attachments: { S: attachments = [] } = {}
            }={}) => {
                return { handle, timestamp, statusId, status, attachments }
            })
        };
        return response;
    } catch(err) {
        return {
            statusCode: 400,
            error: err.toString()
        }
    }

};
