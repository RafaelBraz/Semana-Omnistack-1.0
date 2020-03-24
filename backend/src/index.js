// Importa o express
const express = require('express');
const cors = require('cors');

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

//
app.use(routes);

// Informa a porta que será alocada para a aplicação
app.listen(3333);

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