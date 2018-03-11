exports.up = function (knex) {
  return knex.schema.createTable('channels', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.string('description').defaultTo('Channel description goes here')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('channels')
}
