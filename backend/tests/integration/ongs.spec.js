const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    /**
     * Executa, antes de cada teste, as migrações
     * do banco de dados de teste
     */
    beforeEach(async () => {
        /**
         * Antes de realizar a migração, é interessante
         * dar um rollback no banco (fazendo ele voltar ao
         * estado de criação, considerando que SEMPRE vai executar
         * o rollback) para que os dados criados no teste
         * executado anteriormente sejam destruidos. Caso
         * contrário, esses dados podem influenciar os testes
         * realizados posteriormente.
         */
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    // Desfaz a conexão do banco após finalizar os testes
    afterAll(() => {
        connection.destroy();
    });
    
    it('should be able to create a new ONG', async () => {
        // Envia uma requisição para o app 
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', '17f06a4c') // Setar variáveis de cabeçalho
        .send({
            name: "ONG de Teste",
            email: "teste@teste.com",
            whatsapp: "1122223333",
            city: "Betim",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});