const connection = require('../database/connection');

module.exports = {
    
    async index(request, response) {

        const { page = 1 } = request.query;

        const [count] = await connection('incidents')
            .count(); // Retorna um objeto no estilo {'count(*)': X}
                      // sendo * mostrando que foi buscado TODOS os registros
                      // e X sendo o número total de registros

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // Retorna apenas 5 registros
            .offset(5*(page - 1)) // Pula os registros das páginas anteriores
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        // Coloca o valor de count no header da resposta
        // levando o nome de "X-Total-Count"
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const result = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        const id = result[0]; // Ou substitui o "const result" por "const [id]"
        
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); // retorna somente o primeiro resultado

        if (incident.ong_id !== ong_id) {
            return response.status(401)  // Status de não autorizado do http (buscar HTTP status codes)
                .json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204) // Quando retorna uma resposta bem sucedida, mas sem conteudo
            .send();
    }

}