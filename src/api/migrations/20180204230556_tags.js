exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
    table.increments()
    table.text('label')
    table.timestamps(true, true)

    table.unique('label')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags')
};
