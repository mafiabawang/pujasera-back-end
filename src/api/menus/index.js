const MenusHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'Menus',
    version: '1.0.0',
    register: async (server, { menusService, tenantsService, categoriesMenusService, validator }) => {
        const menusHandler = new MenusHandler(menusService, tenantsService, categoriesMenusService, validator);
        server.route(routes(menusHandler));
    }
};