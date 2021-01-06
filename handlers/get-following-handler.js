const { getFollowers } = require('./services/followService');

exports.handler = async (request, event) => {
    const { handle = "", pagesize, lastkey = "" } = request || {};
    const params = {
        handle,
        pagesize: pagesize ? parseInt(pagesize) : undefined,
        lastkey
    };
    
    try {
        const { Items = [] } = await getFollowers(params, false);
        
        return {
            statusCode: 200,
            usersIFollow: Items.map(({ followeeID: { S: handle = "" } = {}, timestamp: { S: timestamp = "" } = {} }={}) => {
                return { handle, timestamp }
            })
        };
    } catch (err) {
        return {
            statusCode : 400,
            error: err.toString()
        }
    }
};