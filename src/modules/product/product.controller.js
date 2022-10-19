const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const ProductService = require('./product.service')

exports.uploadProductController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.uploadProduct({
            user: req.user, 
            data: req.body,
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.uploadProductImagesController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.uploadProductImages({
            product_id: req.params.id,
            file: req.file.path
        })

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(error);

        return next(createError.InternalServerError(error));
    }
}

exports.getSingleProductyByAUserController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.getSingleProductByAUser(
            req.params
        )

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.getSingleProductyByAMerchantController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.getSingleProductByAMerchant(
            req.params
        )

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.getAllProductsController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.getAllProducts({
            limit: req.query.limit,
            page: req.query.page
        })
        const allData = {
            pagination: data.pagination,
            products: data.allProducts
        }

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, allData)(res, HTTP.CREATED);
    } catch (error) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.getMyProductsByMerchantController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.getMyProductsByMerchant({
            limit: req.query.limit,
            page: req.query.page,
            merchant_id: req.userId
        })
        const allData = {
            pagination: data.pagination,
            products: data.allProducts
        }

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, allData)(res, HTTP.CREATED);
    } catch (error) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}

exports.removeProductController = async (req, res, next) => {
    try {
        const {error, message, data} = await ProductService.removeProduct(
            req.user, 
            req.params
        )

        if (error) {
        return next(
            createError(HTTP.BAD_REQUEST, [
            {
                status: RESPONSE.ERROR,
                message,
                statusCode:
                data instanceof Error ? HTTP.SERVER_ERROR : HTTP.BAD_REQUEST,
                data,
            },
            ])
        );
        }
        return createResponse(message, data)(res, HTTP.CREATED);
    } catch (error) {
        console.error(err);

        return next(createError.InternalServerError(err));
    }
}
