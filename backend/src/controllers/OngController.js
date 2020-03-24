const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        // Seleciona todas as ongs cadastradas na tabela ongs
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response) {
        // Recebe a requisição
        const { name, email, whatsapp, city, uf } = request.body;

        // Gera um id aleatorio para a ONG
        const id = crypto.randomBytes(4).toString('HEX');

        // Insere a ong na tabela de ongs do banco de dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        // Retorna o id da ONG criada
        return response.json({ id });
    }

}