const routes = (handler) => [
    {
        method: 'POST',
        path: '/menus',
        handler: handler.postMenuHandler
    },
    {
        method: 'GET',
        path: '/menus',
        handler: handler.getMenusHandler
    },
    {
        method: 'GET',
        path: '/menus/{id}',
        handler: handler.getMenuByIdHandler
    },
    {
        method: 'PUT',
        path: '/menus/{id}',
        handler: handler.putMenuByIdHandler
    },
    {
        method: 'DELETE',
        path: '/menus/{id}',
        handler: handler.deleteMenuByIdHandler
    }
];

module.exports = routes;