exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('categories_menu', {
        id: {
            type: 'VARCHAR',
            primaryKey: true,
        },
        tenant_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        name: {
            type: 'VARCHAR',
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

exports.down = (pgm) => pgm.dropTable('categories_menu');
