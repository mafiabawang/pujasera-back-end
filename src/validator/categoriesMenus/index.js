const { CategoryMenuCreatePayloadSchema, CategoryMenuUpdatePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const CategoriesMenusValidator = {
    validateCategoryMenuCreatePayload: (payload) => {
        const validationResult = CategoryMenuCreatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateCategoryMenuUpdatePayload: (payload) => {
        const validationResult = CategoryMenuUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    }
};

module.exports = CategoriesMenusValidator;