const CategoriesMenusHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'categoriesMenus',
    version: '1.0.0',
    register: async (server, { categoriesMenusService, tenantsService, validator }) => {
        const categoriesMenusHandler = new CategoriesMenusHandler(categoriesMenusService, tenantsService, validator);
        server.route(routes(categoriesMenusHandler));
    }
};