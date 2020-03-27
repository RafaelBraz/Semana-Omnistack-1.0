const knex = require('knex');
const configuration = require('../../knexfile');

// Seta qual ambiente está sendo executado: teste ou desenvolvimento.
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// Realiza a conexão com o banco de dados
const connection = knex(config);

// Exporta a conexão para ser usada na aplicação
module.exports = connection;