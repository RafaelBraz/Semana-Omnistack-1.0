const knex = require('knex');
const configuration = require('../../knexfile');

// Realiza a conexão com o banco de dados de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;