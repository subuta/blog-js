exports.up = function (knex) {
  return knex.schema.createTable('attachments', function (table) {
    table.string('id').primary()
    table.string('name').notNullable()
    table.string('type').notNullable()
    table.string('imageUrl').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('attachments')
}
