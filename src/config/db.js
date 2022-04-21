//call DATABASE
const { Pool } = require("pg");
const { port, database } = require("pg/lib/defaults");

module.exports = new Pool ({
    user: 'postgres',
    password: 'rocketseat',
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})