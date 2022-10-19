const models = require('../../db/models')
var Sequelize = require('sequelize')
const imageUploader = require('../../common/helpers/cloudImageUpload')
const {hashPassword, comparePassword} = require('../../common/helpers/password')
const {jwtSign} = require('../../common/helpers/token')
const cloudinary = require('../../common/config/cloudinary')
const {
    sequelize,
    Merchant
} = models

exports.registerMerchant = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingMerchant = await Merchant.findOne({
            where:{
                email: data.email,
                deleted: false
            }
        })

        if(existingMerchant){
            return{
                error: true,
                message: 'Email already registered on the server',
                data: null
            }
        }
        const newMerchant = await Merchant.create(
            {
                ...data,
                password: data.password? password: null
            },
            {raw: true}
        )
        return {
            error: false,
            message: "merchant registered successfully",
            data: newMerchant
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginMerchant = async(user, data) => {
    try {
        if(data.password){
            const passwordMatch = await comparePassword(user.password, data.password)
            if (!passwordMatch) {
                return {
                    error: true,
                    message: "Incorrect password.",
                };
            }
        }
         if(!data.password && !data.auth_type){
            return {
                error: true,
                message: "Invalid Authorization",
            };
        }

        const refreshToken = jwtSign(user.id)
        await Merchant.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id, deleted: false}}
        )
        const loginMerchant = await Merchant.findOne({
            attributes:['email','business_name', 'id', 'phone_number'],
            where: {id:user.id, deleted: false}
        })

        return{
            error: false,
            message: 'Login successful',
            data: {loginMerchant, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in merchant at the moment",
            data: null
        }
    }
}

exports.uploadBrandImage = async(payload) => {
    try {
        const {merchantId, file } = payload
        const url = await imageUploader(file)
        // const {url} = await cloudinary.uploader.upload(file)
        if(!url){
            return{
                code: 400,
                status: "error",
                message: "failed to upload brand image",
                data: null
            }
        }
        await Merchant.update(
            {brand_image: url},
            {where:
                {
                    id: merchantId,
                    deleted: false
                }
            }
        )
  
        const updatedMerchant = await Merchant.findOne({
            attributes:['email','business_name', 'id', 'phone_number', 'brand_image'],
            where:{id: merchantId, deleted: false}
        })

        return{
            error: false,
            message: 'Brand image upload successful',
            data:updatedMerchant
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable toupload brand image at the moment",
            data: null
        }
    }
}