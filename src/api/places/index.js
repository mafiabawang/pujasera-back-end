const PlacesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'places',
    version: '1.0.0',
    register: async (server, { placesService, usersService, validator }) => {
        const placesHandler = new PlacesHandler(placesService, usersService, validator);
        server.route(routes(placesHandler));
    }
};