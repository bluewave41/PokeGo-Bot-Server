
exports.up = function(knex) {
  return knex.schema.createTable('player_mail', function(table) {
	  table.integer('userId').unsigned().references('userId').inTable('users').onDelete('cascade').notNullable();
	  table.integer('mailId').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('player_mail');
};
