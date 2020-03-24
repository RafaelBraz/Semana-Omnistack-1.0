
exports.up = function(knex) {
  // Responsável pela criação
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
  });
};

exports.down = function(knex) {
  // Caso dê errado no UP
  return knex.schema.dropTable('ongs');
};

/**
 * npx knex migrate:latest (atualiza o banco com as mudanças produzidas)
 * npx knex migrate:rollback (retorna o banco para o estado anterior à última atualização)
 * npx knex migrate:status (lista as migrations que foram executadas)
 * npx knex (Help do knex para ver outras funcionalidades)
 */
