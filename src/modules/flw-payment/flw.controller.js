const {HTTP} = require('../../common/constants/http')
const {RESPONSE} = require('../../common/constants/response')
const createError = require("../../common/helpers/createError");
const { createResponse } = require("../../common/helpers/createResponse");
const flwPayService = require('./flw.service')

exports.makeInboundPaymentController = async (req, res, next) => {
    try {
        const {error, message, data} = await flwPayService.makePaymentInbound({
            user: req.user, 
            tx_ref: req.body.tx_ref,
            amount: req.body.amount,
            redirect_url: req.body.redirect_url,
            email: req.body.email,
            name: req.body.name,
            order_id: req.body.order_id,
            tracking_id: req.body.tracking_id,
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

exports.confirmInboundPaymentController = async (req, res, next) => {
    try {
        const {error, message, data} = await flwPayService.confirmPaymentInbound({
            user: req.user, 
            status: req.query.status,
            tx_ref: req.query.tx_ref,
            flw_transaction_id: req.query.transaction_id,
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


