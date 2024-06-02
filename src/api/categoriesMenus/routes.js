const routes = (handler) => [
    {
        method: 'POST',
        path: '/categories_menus',
        handler: handler.postCategoryMenuHandler
    },
    {
        method: 'GET',
        path: '/categories_menus',
        handler: handler.getCategoriesMenusHandler
    },
    {
        method: 'GET',
        path: '/categories_menus/{id}',
        handler: handler.getCategoryMenuByIdHandler
    },
    {
        method: 'PUT',
        path: '/categories_menus/{id}',
        handler: handler.putCategoryMenuByIdHandler
    },
    {
        method: 'DELETE',
        path: '/categories_menus/{id}',
        handler: handler.deleteCategoryMenuByIdHandler
    }
];

module.exports = routes;