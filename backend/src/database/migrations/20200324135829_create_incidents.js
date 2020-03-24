exports.up = function(knex) {
    // Responsável pela criação
    return knex.schema.createTable('incidents', function (table) {
        // Id com autoincrement
        table.increments();

        // Informações
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        // Id da ong que criou esse caso
        table.string('ong_id').notNullable();
    
        // Referencia de chave estrangeira para a ong que criou o caso
        table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  exports.down = function(knex) {
    // Caso dê errado no UP
    return knex.schema.dropTable('incidents');
  };
  