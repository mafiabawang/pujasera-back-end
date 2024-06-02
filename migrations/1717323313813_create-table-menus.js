exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('menus', {
        id: {
            type: 'VARCHAR',
            primaryKey: true,
        },
        tenant_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        category_menu_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        name: {
            type: 'VARCHAR',
            notNull: true,
        },
        description: {
            type: 'VARCHAR',
            notNull: true,
        },
        price: {
            type: 'INTEGER',
            notNull: true,
        },
        qty: {
            type: 'INTEGER',
            notNull: true,
        },
        created_at: {
            type: 'VARCHAR',
            notNull: true,
        },
        updated_at: {
            type: 'VARCHAR',
            notNull: true,
        },
    });
};

exports.down = (pgm) => pgm.dropTable('menus');
