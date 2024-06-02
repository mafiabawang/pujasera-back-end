const routes = (handler) => [
    {
        method: 'POST',
        path: '/places',
        handler: handler.postPlaceHandler
    },
    {
        method: 'GET',
        path: '/places',
        handler: handler.getPlacesHandler
    },
    {
        method: 'GET',
        path: '/places/{id}',
        handler: handler.getPlaceByIdHandler
    },
    {
        method: 'PUT',
        path: '/places/{id}',
        handler: handler.putPlaceByIdHandler
    },
    {
        method: 'PUT',
        path: '/places/{id}/owner',
        handler: handler.putPlaceOwnerByIdHandler
    },
    {
        method: 'DELETE',
        path: '/places/{id}',
        handler: handler.deletePlaceByIdHandler
    }
];

module.exports = routes;