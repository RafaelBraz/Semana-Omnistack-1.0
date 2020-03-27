
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
