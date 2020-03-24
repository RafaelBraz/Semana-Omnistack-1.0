const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Inicializa apenas o pacote de rotas do express
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

/* 
routes.post('/users', (request, response) => {

    // Adquire os dados vindos do Query Params
    //const query_params = request.query;

    // Adquire os dados vindos do Route Params
    //const route_params = request.params;

    // Adquire os dados vindos do Request Body
    const request_body = request.body;

    console.log(request_body);

    // Envia uma resposta(response) de volta para "quem" fez a requisição
    return response.json({
        evento: 'Semana Omnistack 11.0',
        aluno: 'Rafael Braz'
    });

}); */

/**
 * Ocorreu um erro em que a tabela ongs não foi reconhecida no sqlite
 * 1 - desse modo foi necessário deletar o db.sqlite criado e rodar novamente
 * o migrate:latest
 * 2 - A tentativa (1) não funcionou, pesquisando na internet, percebi
 * que era necessário retornar uma promise (sendo o createTable) no module.up
 * criado para migração
 */