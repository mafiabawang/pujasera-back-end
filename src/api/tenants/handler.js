const autoBind = require('auto-bind');

class TenantsHandler {
    constructor(tenantsService, usersService, placesService, validator) {
        this._tenantsService = tenantsService;
        this._usersService = usersService;
        this._placesService = placesService;
        this._validator = validator;

        autoBind(this);
    }

    async postTenantHandler(request, h) {
        this._validator.validateTenantCreatePayload(request.payload);
        const { seller_id, place_id, name, about } = request.payload;

        const seller = await this._usersService.getUserById(seller_id);
        await this._usersService.checkRoleSeller(seller.id);

        const place = await this._placesService.getPlaceById(place_id);

        const TenantId = await this._tenantsService.addTenant({ seller_id: seller.id, place_id: place.id, name, about });

        const response = h.response({
            status: 'success',
            message: 'Merchant berhasil ditambahkan',
            data: {
                TenantId
            }
        });
        response.code(201);
        return response;
    }

    async getTenantsHandler(request) {
        const { pId } = request.query;

        const tenants = await this._tenantsService.getTenants(pId);

        return {
            status: 'success',
            data: {
                tenants
            }
        };
    }

    async getTenantByIdHandler(request) {
        const { id } = request.params;
        const tenant = await this._tenantsService.getTenantById(id);

        return {
            status: 'success',
            data: {
                tenant
            }
        };
    }

    async putTenantByIdHandler(request) {
        this._validator.validateTenantUpdatePayload(request.payload);
        const { name, about } = request.payload;
        const { id } = request.params;

        await this._tenantsService.editTenantById(id, { name, about });

        return {
            status: 'success',
            message: 'Informasi Merchant berhasil diperbarui'
        };
    }

    async putTenantSellerByIdHandler(request) {
        this._validator.validateTenantSellerUpdatePayload(request.payload);
        const { old_seller_id, new_seller_id } = request.payload;
        const { id } = request.params;


        await this._tenantsService.editTenantSellerById(id, { old_seller_id, new_seller_id });

        return {
            status: 'success',
            message: 'Seller Merchant berhasil diperbarui'
        };
    }

    async deleteTenantByIdHandler(request) {
        const { id } = request.params;
        await this._tenantsService.deleteTenantById(id);

        return {
            status: 'success',
            message: 'Merchant berhasil dihapus'
        };
    }
}

module.exports = TenantsHandler;