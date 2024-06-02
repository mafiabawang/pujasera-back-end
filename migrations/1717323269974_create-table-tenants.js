exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('tenants', {
        id: {
            type: 'VARCHAR',
            primaryKey: true,
        },
        seller_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        place_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        name: {
            type: 'VARCHAR',
            notNull: true,
        },
        about: {
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

exports.down = (pgm) => pgm.dropTable('tenants');
