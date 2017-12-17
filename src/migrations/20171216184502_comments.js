exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments()
    table.integer('channel').references('channels.id').onDelete('CASCADE')
    table.integer('commentedBy')
    table.integer('attachment')
    table.text('text').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments')
}
