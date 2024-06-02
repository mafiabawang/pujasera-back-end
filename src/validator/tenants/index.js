const { TenantCreatePayloadSchema, TenantUpdatePayloadSchema, TenantSellerUpdatePayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const TenantsValidator = {
    validateTenantCreatePayload: (payload) => {
        const validationResult = TenantCreatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateTenantUpdatePayload: (payload) => {
        const validationResult = TenantUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    },
    validateTenantSellerUpdatePayload: (payload) => {
        const validationResult = TenantSellerUpdatePayloadSchema.validate(payload);
        if (validationResult.error) throw new InvariantError(validationResult.error.message);
    }
};

module.exports = TenantsValidator;