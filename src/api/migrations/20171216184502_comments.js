exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.increments()
    table.integer('channelId').references('channels.id').onDelete('CASCADE')
    table.integer('commentedById').notNullable()
    table.string('attachmentId')
    table.text('text').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('comments')
}
