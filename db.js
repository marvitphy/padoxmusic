const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'us-cdbr-east-02.cleardb.com',
        user: process.env.DB_USER || 'bf53ed4da4bbc8',
        password: process.env.DB_PASS || 'b22de708',
        database: 'heroku_bd97f90f7a70ef6'
    },
    pool: { min: 0, max: 10 },
});

module.exports = knex