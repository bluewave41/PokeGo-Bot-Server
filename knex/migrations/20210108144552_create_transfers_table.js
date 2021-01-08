
exports.up = function(knex) {
  return knex.schema.createTable('transfers', function(table) {
	  table.integer('userId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable();
	  table.integer('pokemonId').unsigned().references('pokemonId').inTable('pokemon').notNullable();
	  table.primary('userId');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('transfers');
};
