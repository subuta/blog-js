exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function (table) {
    table.increments()
    table.text('title').notNullable()
    table.string('slug').notNullable()
    table.boolean('isPublished').notNullable()
    table.text('summary')
    table.text('content').notNullable()
    table.timestamps(true, true)
    // make slug unique.
    table.unique('slug')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles')
};
