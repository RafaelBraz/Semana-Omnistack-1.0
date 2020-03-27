const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); 

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Inicializa apenas o pacote de rotas do express
const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    }),
}), SessionController.create);

routes.get('/ongs', OngController.index);

/**
 * Aula 5:
 * No express o fluxo é da esquerda para direita,
 * portanto, a validação deve vir antes da criação.
 * 
 * OBS.: Podem ser adicionados vários middlewares
 * na rota do express.
 * 
 */
routes.post('/ongs', celebrate({
    /**
     * Aula 5:
     * Sempre que a chave do objeto for uma variável,
     * é necessário colocar [] em volta
     */
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11), // (11) 9 9999-9999
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

routes.get('/profile', celebrate({
    /**
     * Aula 5:
     * Durante uma requisição, vários headers são enviados,
     * dessa forma, a função "unknown()" irá descartar toda
     * validação que não está sendo feita dentro do objeto
     * do Joi.
     */
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

routes.post('/incidents', celebrate({
    
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),

}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

module.exports = routes;


/* Aula 2: 
routes.post('/users', (request, response) => {

    // Adquire os dados vindos do Query Params
    const query_params = request.query;

    // Adquire os dados vindos do Route Params
    const route_params = request.params;

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
 * Aula 2:
 * Ocorreu um erro em que a tabela ongs não foi reconhecida no sqlite
 * 1 - desse modo foi necessário deletar o db.sqlite criado e rodar novamente
 * o migrate:latest
 * 2 - A tentativa (1) não funcionou, pesquisando na internet, percebi
 * que era necessário retornar uma promise (sendo o createTable) no module.up
 * criado para migração
 */

/**
 * Aula 5:
 * Error 500: Significa que a aplicação não soube se comportar perante o erro
 * (Portanto, evitar esse tipo de erro).
 */
