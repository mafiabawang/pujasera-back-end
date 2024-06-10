const autoBind = require('auto-bind');

class MenusHandler {
    constructor(menusService, tenantsService, categoriesMenusService, validator) {
        this._menusService = menusService;
        this._tenantsService = tenantsService;
        this._categoriesMenusService = categoriesMenusService;
        this._validator = validator;

        autoBind(this);
    }

    async postMenuHandler(request, h) {
        this._validator.validateMenuCreatePayload(request.payload);
        const { tenant_id, category_menu_id, name, description, price, qty } = request.payload;

        const tenant = await this._tenantsService.getTenantById(tenant_id);
        const categoryMenu = await this._categoriesMenusService.getCategoryMenuById(category_menu_id);

        const menuId = await this._menusService.addMenu({ tenant_id: tenant.id, category_menu_id: categoryMenu.id, name, description, price, qty });

        const response = h.response({
            status: 'success',
            message: 'Menu berhasil ditambahkan',
            data: {
                menuId,
            },
        });
        response.code(201);
        return response;
    }

    async getMenusHandler(request) {
        const { tId, pId } = request.query;
        const menus = await this._menusService.getMenus(tId, pId);
        return {
            status: 'success',
            data: {
                menus,
            },
        };
    }

    async getMenuByIdHandler(request) {
        const { id } = request.params;
        const menu = await this._menusService.getMenuById(id);
        return {
            status: 'success',
            data: {
                menu,
            },
        };
    }

    async putMenuByIdHandler(request) {
        this._validator.validateMenuUpdatePayload(request.payload);
        const { id } = request.params;
        const { name, description, price, qty } = request.payload;

        await this._menusService.editMenuById(id, { name, description, price, qty });

        return {
            status: 'success',
            message: 'Menu berhasil diperbarui',
        };
    }

    async deleteMenuByIdHandler(request) {
        const { id } = request.params;
        await this._menusService.deleteMenuById(id);
        return {
            status: 'success',
            message: 'Menu berhasil dihapus',
        };
    }
}

module.exports = MenusHandler;