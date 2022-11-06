const Joi = require('joi').extend(require('@joi/date'))
Joi.objectId = require("joi-objectid")(Joi);

exports.registerMerchantSchema = Joi.object().keys({
    business_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required() 
})

exports.loginMerchantSchema = Joi.object().keys({
    email: Joi.string().trim().optional().label("email"),
    password: Joi.string().when("auth_type", {
        not: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
    }),
    auth_type: Joi.string().valid("gg", "fb", "ap").optional(),
   
})
     .xor("email", "phone_number")
    .label("field");

exports.paginateSchema = Joi.object({
  page: Joi.number().positive().optional(),
  limit: Joi.number().positive().optional(),
});