exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function (table) {
    table.increments()
    table.text('title').notNullable()
    table.text('summary')
    table.text('content').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles')
};
