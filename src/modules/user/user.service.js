const models = require('../../db/models')
var Sequelize = require('sequelize')
const {hashPassword, comparePassword, forgotPassword, resetPassword} = require('../../common/helpers/password')
const {jwtSign, jwtVerify} = require('../../common/helpers/token')
const {
    sequelize,
    User,
} = models

exports.registerUser = async (data) =>{
    try {
        let password
        if(data.password){
            password = hashPassword(data.password)
        }
        const existingUser = await User.findAll({
            where:{
                email: data.email
            }
        })

        if(existingUser.length > 0){
            return{
                error: true,
                message: 'Email already exist on the server',
                data: null
            }
        }

        const newUser = await User.create(
            {
                ...data,
                password: data.password? password: null,
            },
            {raw: true}
        )

        return {
            error: false,
            message: "User registered successfully",
            data: newUser
        }

    } catch (error) {
        console.log(error)
        return{
            message: error.message|| "Unable to register user at the moment",
            data: null
        }
        
    }
}

exports.loginUser = async(user, data) => {
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
        await User.update(
            {refreshTokens: refreshToken},
            {where: {id: user.id}}
        )
        const loginUser = await User.findOne({
            attributes:['email','fullname', 'id', 'refreshTokens'],
            where: {
                id:user.id,
                
            }
        })

        if(Boolean(loginUser.isBlocked) === true) {
            return {
                error: true,
                message: "This user has been blocked from accessing this platform",
                data: null
            }
        }

        return{
            error: false,
            message: 'Login successful',
            data: {loginUser, accesstoken: refreshToken}
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log in user at the moment",
            data: null
        }
    }
}

exports.logoutUser = async(token) => {
    try {
        const {id} = jwtVerify(token)
        const loggedInuser = await User.findOne({where:{id: id}})
        if(!loggedInuser){
            return {
                error: true,
                message: "User not found",
            }
        }
        await User.update(
            {refreshTokens: null},
            {where: {id: loggedInuser.id}}
        )

        const loggedOutUser = await User.findOne({where: {id: loggedInuser.id}})
        return{
            error: false,
            message: 'Logout successful',
            data: loggedOutUser
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to log out user at the moment",
            data: null
        }
    }
}

exports.forgotPassword = async(body) => {
    try {
        const {email} = body
        const forgot = await forgotPassword(User, email)
        return{
            error: forgot.error,
            message: forgot.message,
            data: forgot.data
        }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to send email at the moment",
            data: null
        }
    }
}

exports.resetPassword = async(body) => {
    try {
        const {newPassword, otp} = body
        const {model, email} = await resetPassword(User, otp, newPassword)

    return{
        error: false,
        message: `password of ${email} changed successfully`,
        data: model
    }

    } catch (error) {
        console.log(error)
        return{
            error: true,
            message: error.message|| "Unable to change password at the moment",
            data: null
        }
    }
}