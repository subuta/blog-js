exports.up = function(knex, Promise) {
  return knex.schema.createTable('reactions', function (table) {
    table.increments()
    table.string('emoji').notNullable()
    table.string('reactableType').notNullable()
    table.integer('reactableId').notNullable()
    table.integer('reactedById').references('users.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reactions')
};
