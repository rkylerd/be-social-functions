const { uploadPhotoAsBinary } = require("../DAOs/profilePhotoDAO");

const uploadProfilePhoto = (photoDetails) => {
    return uploadPhotoAsBinary(photoDetails);
}

exports.uploadProfilePhoto = uploadProfilePhoto;