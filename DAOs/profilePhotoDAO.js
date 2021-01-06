const { putObject } = require("./s3Operations")
const globalParams = {
    Bucket: "tweeter-profile-photos"
};

// const params = {
//     ACL: 'public-read'
// };
const uploadPhotoAsBinary = ({handle = "", imageType = "", binary = ""}) => {
    const params = {
        ...globalParams,
        Body: binary, 
        Key: handle, 
        ContentType: `image/${imageType}`,
        CacheControl: "max-age=0"
    };
    
    return putObject(params);
}

exports.uploadPhotoAsBinary = uploadPhotoAsBinary;