const Joi = require('joi');

const MenuCreatePayloadSchema = Joi.object({
    tenant_id: Joi.string().required(),
    category_menu_id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().required()
});

const MenuUpdatePayloadSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required(),
    qty: Joi.number().integer().required()
});


module.exports = { MenuCreatePayloadSchema, MenuUpdatePayloadSchema };