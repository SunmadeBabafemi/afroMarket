const {Router} = require('express')
const { authorize } = require('../../common/middlewares/authorize')
const validateRequest = require('../../common/middlewares/validateRequest')
const upload = require('../../common/config/multer')
const { 
    createDisputeController,
    removeDisputeController,
    viewDisputeController,
    getAllDisputesController,
    uploadDiputeImageController
} = require('./dispute.controller')
const {
singleDisputeSchema,
createDisputeSchema
} = require('./dispute.schema')

const router = Router()

router.post(
    '/create/:id',
    validateRequest(createDisputeSchema, "body"),
    validateRequest(singleDisputeSchema, "params"),
    authorize(),
    createDisputeController
)

router.patch(
    '/:id/upload-image',
    validateRequest(singleDisputeSchema, "params"),
    authorize(),
    upload.single("image"),
    uploadDiputeImageController
)

router.get(
    '/all',
    authorize(),
    getAllDisputesController
)

router.get(
    '/:id',
    validateRequest(singleDisputeSchema, "params"),
    authorize(),
    viewDisputeController
)


router.delete(
    '/remove/:id',
    validateRequest(singleDisputeSchema, "params"),
    authorize(),
    removeDisputeController
)


module.exports = router