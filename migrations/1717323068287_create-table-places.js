exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('places', {
        id: {
            type: 'VARCHAR',
            primaryKey: true,
        },
        owner_id: {
            type: 'VARCHAR',
            notNull: true,
        },
        name: {
            type: 'VARCHAR',
            notNull: true,
        },
        lat: {
            type: 'VARCHAR',
            notNull: true,
        },
        long: {
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

exports.down = (pgm) => pgm.dropTable('places');
