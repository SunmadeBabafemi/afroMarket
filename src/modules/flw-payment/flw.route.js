const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
makeInboundPaymentController,
confirmInboundPaymentController
} = require('./flw.controller')
const {
    createPayMentSchema,
    confirmPayMentSchema
} = require('./flw.schema')

const router = Router()

router.post(
    '/initiate',
    validateRequest(createPayMentSchema, "body"),
    authorize(),
    makeInboundPaymentController
)

router.get(
    '/confirm',
    validateRequest(confirmPayMentSchema, "query"),
    authorize(),
    confirmInboundPaymentController
)



module.exports = router