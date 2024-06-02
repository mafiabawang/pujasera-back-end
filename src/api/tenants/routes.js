const routes = (handler) => [
    {
        method: 'POST',
        path: '/tenants',
        handler: handler.postTenantHandler
    },
    {
        method: 'GET',
        path: '/tenants',
        handler: handler.getTenantsHandler
    },
    {
        method: 'GET',
        path: '/tenants/{id}',
        handler: handler.getTenantByIdHandler
    },
    {
        method: 'PUT',
        path: '/tenants/{id}',
        handler: handler.putTenantByIdHandler
    },
    {
        method: 'PUT',
        path: '/tenants/{id}/seller',
        handler: handler.putTenantSellerByIdHandler
    },
    {
        method: 'DELETE',
        path: '/tenants/{id}',
        handler: handler.deleteTenantByIdHandler
    }
];

module.exports = routes;