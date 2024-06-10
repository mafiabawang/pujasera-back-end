const autoBind = require('auto-bind');

class CategoriesMenusHandler {
    constructor(categoriesMenusService, tenantsService, validator) {
        this._categoriesMenusService = categoriesMenusService;
        this._tenantsService = tenantsService;
        this._validator = validator;

        autoBind(this);
    }

    async postCategoryMenuHandler(request, h) {
        this._validator.validateCategoryMenuCreatePayload(request.payload);
        const { tenant_id, name } = request.payload;

        const tenant = await this._tenantsService.getTenantById(tenant_id);

        const categoryMenuId = await this._categoriesMenusService.addCategoryMenu({ tenant_id: tenant.id, name });
        const response = h.response({
            status: 'success',
            message: 'Kategori Menu berhasil ditambahkan',
            data: {
                categoryMenuId,
            },
        });
        response.code(201);
        return response;
    }

    async getCategoriesMenusHandler(request) {
        const { tId } = request.query;
        const categoriesMenus = await this._categoriesMenusService.getCategoriesMenus(tId);
        return {
            status: 'success',
            data: {
                categoriesMenus,
            },
        };
    }

    async getCategoryMenuByIdHandler(request) {
        const { id } = request.params;
        const categoryMenu = await this._categoriesMenusService.getCategoryMenuById(id);
        return {
            status: 'success',
            data: {
                categoryMenu,
            },
        };
    }

    async putCategoryMenuByIdHandler(request) {
        this._validator.validateCategoryMenuUpdatePayload(request.payload);
        const { name } = request.payload;
        const { id } = request.params;

        await this._categoriesMenusService.editCategoryMenuById(id, { name });

        return {
            status: 'success',
            message: 'Kategori Menu berhasil diperbarui'
        };
    }

    async deleteCategoryMenuByIdHandler(request) {
        const { id } = request.params;
        await this._categoriesMenusService.deleteCategoryMenuById(id);

        return {
            status: 'success',
            message: 'Kategori Menu berhasil dihapus'
        };
    }
}

module.exports = CategoriesMenusHandler;