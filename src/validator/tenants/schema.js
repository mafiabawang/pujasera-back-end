const Joi = require('joi');

const TenantCreatePayloadSchema = Joi.object({
    seller_id: Joi.string().required(),
    place_id: Joi.string().required(),
    name: Joi.string().required(),
    about: Joi.string().required()
});

const TenantUpdatePayloadSchema = Joi.object({
    name: Joi.string().required(),
    about: Joi.string().required()
});

const TenantSellerUpdatePayloadSchema = Joi.object({
    old_seller_id: Joi.string().required(),
    new_seller_id: Joi.string().required()
});

module.exports = { TenantCreatePayloadSchema, TenantUpdatePayloadSchema, TenantSellerUpdatePayloadSchema };