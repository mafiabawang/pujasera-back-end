const Joi = require('joi');

const CategoryMenuCreatePayloadSchema = Joi.object({
    tenant_id: Joi.string().required(),
    name: Joi.string().required()
});

const CategoryMenuUpdatePayloadSchema = Joi.object({
    name: Joi.string().required()
});


module.exports = { CategoryMenuCreatePayloadSchema, CategoryMenuUpdatePayloadSchema };