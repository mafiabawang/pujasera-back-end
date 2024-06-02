const Joi = require('joi');

const PlaceCreatePayloadSchema = Joi.object({
    name: Joi.string().required(),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    owner_id: Joi.string().required()
});

const PlaceUpdatePayloadSchema = Joi.object({
    name: Joi.string().required(),
    lat: Joi.string().required(),
    long: Joi.string().required()
});

const OwnerPlaceUpdatePayloadSchema = Joi.object({
    old_owner_id: Joi.string().required(),
    new_owner_id: Joi.string().required()
});

module.exports = { PlaceCreatePayloadSchema, PlaceUpdatePayloadSchema, OwnerPlaceUpdatePayloadSchema };