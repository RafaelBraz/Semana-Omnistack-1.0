// Importa o express
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes'); // './' Demonstra que é um arquivo passando o caminho relativo

// Inicializa o express
const app = express();

// Habilita o CORS para o sistema
/**
 * O código abaixo é indicado para desenvolvimento, apenas
 * Para enviar o projeto para produção é importante utilizar:
 * app.use(cors(
 *  origin: 'http://frontend.com' // Endereço de origem do sistema que tenta acessar
 *                                // o sistema atual, por exemplo, o front-end
 * ))
 */
app.use(cors());

// Informa ao express que nas requisições serão usados JSONs
app.use(express.json());

// Configura as rotas da aplicação
app.use(routes);

// Trata os erros referentes à validação das requisições
app.use(errors());

// Exporta o app
module.exports = app;

/**
 * Rota / Recurso
 * Métodos Http: Get, Post, Put, Delete, Trace, Options, Patch, Connect, Head
 */

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 * 
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros e paginação) (GET)
 *               http://localhost:3333/users?nome=Rafael&idade=22
 * 
 * Route Params: Parâmetros utilizados para identificar recursos
 *               app.get('/users/:id', ...) ---> http://localhost:3333/users/1
 * 
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server, etc...
 * NoSQL: MongoDB, CouchDB, etc...
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where() (Vantagem: É possível mudar de banco de dados SQL sem alterar o código)
 */