exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR',
            notNull: true,
        },
        email: {
            type: 'TEXT',
            notNull: true,
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        role: {
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

exports.down = (pgm) => pgm.dropTable('users');
