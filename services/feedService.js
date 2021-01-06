const { getFeed } = require('../DAOs/feedDAO')
   
const getUserFeed = ({ handle, lastkey, pagesize = 20 }) => {
    if (!handle) {
        throw new Error("User handle is required");
    }
    handle = `@${handle}`;
    return getFeed({handle, lastkey, pagesize});
}

exports.getFeed = getUserFeed;


