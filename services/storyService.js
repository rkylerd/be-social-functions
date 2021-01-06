const { getStory } = require('../DAOs/storyDAO');

const getUserStory = ({ lastkey = '', pagesize = 20, handle = '' }) => {
    if (!handle) {
        throw new Error("User handle is required");
    }
    handle = `@${handle}`;
    return getStory({handle, lastkey, pagesize});
}

exports.getStory = getUserStory;