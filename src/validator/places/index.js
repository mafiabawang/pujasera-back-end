const { PlaceCreatePayloadSchema, PlaceUpdatePayloadSchema, OwnerPlaceUpdatePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const PlacesValidator = {
    validatePlaceCreatePayload: (payload) => {
        const validationResult = PlaceCreatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validatePlaceUpdatePayload: (payload) => {
        const validationResult = PlaceUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateOwnerPlaceUpdatePayload: (payload) => {
        const validationResult = OwnerPlaceUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    }
};

module.exports = PlacesValidator;