const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'sql204.main-hosting.eu',
        user: process.env.DB_USER || 'u126436471_padox',
        password: process.env.DB_PASS || 'Padox123',
        database: 'u126436471_padox'
    },
    pool: { min: 0, max: 10 },
});

module.exports = knex