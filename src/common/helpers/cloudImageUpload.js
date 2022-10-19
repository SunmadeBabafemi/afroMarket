const cloudinary = require('../config/cloudinary')
const imageUploader = async (file) =>{
    const {url} = await cloudinary.uploader.upload(file)
    return url
}

module.exports = imageUploader