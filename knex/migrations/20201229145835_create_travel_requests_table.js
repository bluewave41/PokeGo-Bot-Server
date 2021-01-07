
exports.up = function(knex) {
  return knex.schema.createTable('travelrequests', function(table) {
	 table.integer('userId').primary().unsigned().references('userId').inTable('users').onDelete('cascade').notNullable();
	 table.string('location');
	 table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('travelrequests');
};
