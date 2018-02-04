exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
    table.increments()
    table.text('label')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags')
};
