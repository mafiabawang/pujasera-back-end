require('dotenv').config();
const Hapi = require('@hapi/hapi');
const ClientError = require('./exceptions/ClientError');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const places = require('./api/places');
const PlacesService = require('./services/postgres/PlacesService');
const PlacesValidator = require('./validator/places');

const tenants = require('./api/tenants');
const TenantsService = require('./services/postgres/TenantsService');
const TenantsValidator = require('./validator/tenants');

const categoriesMenus = require('./api/categoriesMenus');
const CategoriesMenusService = require('./services/postgres/CategoriesMenusService');
const CategoriesMenusValidator = require('./validator/categoriesMenus');

const menus = require('./api/menus');
const MenusService = require('./services/postgres/MenusService');
const MenusValidator = require('./validator/menus');

const init = async () => {
    const usersService = new UsersService();
    const placesService = new PlacesService();
    const tenantsService = new TenantsService();
    const categoriesMenusService = new CategoriesMenusService();
    const menusService = new MenusService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: users,
            options: {
                service: usersService,
                validator: UsersValidator
            }
        },
        {
            plugin: places,
            options: {
                placesService,
                usersService,
                validator: PlacesValidator
            }
        },
        {
            plugin: tenants,
            options: {
                tenantsService,
                usersService,
                placesService,
                validator: TenantsValidator
            }
        },
        {
            plugin: categoriesMenus,
            options: {
                categoriesMenusService,
                tenantsService,
                validator: CategoriesMenusValidator
            }
        },
        {
            plugin: menus,
            options: {
                menusService,
                tenantsService,
                categoriesMenusService,
                validator: MenusValidator
            }
        }
    ]);

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (response instanceof ClientError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();