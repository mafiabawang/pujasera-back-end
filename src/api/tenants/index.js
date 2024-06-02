const TenantsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'tenants',
    version: '1.0.0',
    register: async (server, { tenantsService, usersService, placesService, validator }) => {
        const tenantsHandler = new TenantsHandler(tenantsService, usersService, placesService, validator);
        server.route(routes(tenantsHandler));
    }
};