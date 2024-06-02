const { MenuCreatePayloadSchema, MenuUpdatePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const MenusValidator = {
    validateMenuCreatePayload: (payload) => {
        const validationResult = MenuCreatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateMenuUpdatePayload: (payload) => {
        const validationResult = MenuUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    }
};

module.exports = MenusValidator;