const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const { 
createOrderController,
getMyOrdersController,
cancelOrderController,
singleOrderController
} = require('./order.controller')
const {
 createOrderSchema,
 cancelOrderSchema,
 singleOrderSchema
} = require('./order.schema')

const router = Router()

router.post(
    '/create',
    validateRequest(createOrderSchema, "body"),
    authorize(),
    createOrderController
)

router.patch(
    '/cancel/:id',
    validateRequest(cancelOrderSchema, "params"),
    authorize(),
    cancelOrderController
)

router.get(
    '/my-orders',
    authorize(),
    getMyOrdersController
)

router.get(
    '/single/:id',
    validateRequest(singleOrderSchema, "params"),
    authorize(),
    singleOrderController
)

// router.delete(
//     '/:id',
//     validateRequest(removeProductSchema, "params"),
//     authorize(),
//     removeProductController
// )


module.exports = router