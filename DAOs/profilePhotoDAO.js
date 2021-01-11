const { putObject } = require("./s3Operations")
const globalParams = {
    Bucket: "tweeter-profile-photos"
};

const uploadPhotoAsBinary = ({handle = "", type = "", file }) => {
    if (!file) throw new Error("File was empty");
    
    const params = {
        Bucket: "tweeter-profile-photos",
        Body: file,
        Key: handle,
        ContentEncoding: 'base64',
        ContentType: type
        // CacheControl: "max-age=0"
    };
    
    return putObject(params);
}

exports.uploadPhotoAsBinary = uploadPhotoAsBinary;