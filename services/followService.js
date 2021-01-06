const { getUsersFollowingHandle, getUsersFollowedBy, addToFollowing, 
    addManyRelationships, removeFromFollowing, deleteManyRelationships } = require('../DAOs/followDAO');

const getFollowers = ({ lastkey = '', pagesize = 20, handle = '' }, usersFollowingMe = true) => {
    if (!handle) {
        throw new Error("User handle is required");
    }
    handle = `@${handle}`;
    return usersFollowingMe ? 
        // Users following this handle
        getUsersFollowingHandle({handle, lastkey, pagesize}) :
        // Users the handle user is following
        getUsersFollowedBy({handle, lastkey, pagesize});
}

const isInFollowing = async ({followingUser, followedUser}) => {
    try {
        const { Items: followingList = [] } = await getFollowers({ handle: followingUser }, false);
        return followingList.some(({handle}) => handle === `@${followedUser}`)
    } catch (err) {
        throw new Error(`Error while checking if ${followedUser} is in ${followingUser}'s following`);
    }
}

const follow = ({follower, followee}) => {
    if (!follower) {
        throw new Error("User handle is required");
    }
    
    if (!followee) {
        throw new Error("The user to be followed is required");
    }
    follower = `@${follower}`;
    followee = `@${followee}`;
    // let authTokenDAO = new AuthTokenDAO();
    // let compareTokenResult = await authTokenDAO.checkForAuthToken(this.authToken, this.handle);
    
    // If invalid token
    // if (parseInt(compareTokenResult.Count) != 1) {  
    //     return JSON.stringify({message: "Invalid token signature. Login to post a status"});
    // }
    
    return addToFollowing(follower, followee);
}

const unfollow = ({ follower, followee }) => {
    if (!follower) {
        throw new Error("User handle is required.");
    }
    
    if (!followee) {
        throw new Error("The user to be unfollowed is required.");
    }
    follower = `@${follower}`;
    followee = `@${followee}`;
    // let compareTokenResult = await checkForAuthToken(this.authToken, this.handle);
    // If invalid token
    // if (parseInt(compareTokenResult.Count) != 1) {  
    //     return JSON.stringify({message: "Invalid token signature. Login to post a status"});
    // }

    return removeFromFollowing(follower, followee);
    
}

const generateRelationships = (handle = '', forCreation = true) => {
    if (!handle) {
        throw new Error("User handle is required for generateRelationships");
    }
    const method = forCreation ? addManyRelationships : deleteManyRelationships;
    const promises = [];
    const relationships = [];

    for (let i = 1; i <= 10000; i++) {
        relationships.push({followerID: `@user${i}`, followeeID: `@${handle}`});
        if ( !(i % 25) ) {
            promises.push( method( relationships.splice(0, 25) ) );
        }
    }

    return Promise.all(promises)
        .then(result => {
            return result;
        }).catch(err => {
            console.log(err);
            throw new Error('error while populating follow table with 10000 records.')
        })
}

exports.getFollowers = getFollowers;
exports.follow = follow;
exports.unfollow = unfollow;
exports.generateRelationships = generateRelationships;
exports.isInFollowing = isInFollowing;


