const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const { authMerchLogin } = require('../../common/middlewares/authorizeLogin')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
registerMerchantController,
loginMerchantController,
uploadBrandImageController,
getAllMerchantsController
} = require('./merchant.controller')
const {
 registerMerchantSchema,
 loginMerchantSchema,
 paginateSchema,
} = require('./merchant.schema')

const router = Router()

router.post(
    '/signup',
    validateRequest(registerMerchantSchema, "body"),
    registerMerchantController
)
router.post(
    '/login',
    validateRequest(loginMerchantSchema, "body"),
    authMerchLogin,
    loginMerchantController
)

router.patch(
    '/upload-image',
    authorize(),
    upload.single("image"),
    uploadBrandImageController
)

router.get(
    '/all',
    validateRequest(paginateSchema, 'query'),
    getAllMerchantsController
)

module.exports = router