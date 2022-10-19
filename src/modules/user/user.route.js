const {Router} = require('express')
const { authorizeLogin } = require('../../common/middlewares/authorizeLogin')
const {authorize} = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
 registerUserController,
 loginUserController,
 logoutUserController,
 forgotPasswordController,
 resetPasswordController
} = require('./user.controller')
const {
 registerUserSchema,
 loginUserSchema,
 forgotPasswordSchema,
 resetPasswordSchema
} = require('./user.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerUserSchema, "body"),
    registerUserController
)
router.post(
    '/login',
    validateRequest(loginUserSchema, "body"),
    authorizeLogin,
    loginUserController
)
router.get(
    '/logout',
    authorize(),
    logoutUserController
)

router.post(
    '/pass/forgot',
    validateRequest(forgotPasswordSchema, "body"),
    forgotPasswordController
)

router.post(
    '/pass/reset',
    validateRequest(resetPasswordSchema, "body"),
    resetPasswordController
)

module.exports = router