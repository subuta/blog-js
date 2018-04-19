exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.text('auth0Id').notNullable()
    table.string('locale').notNullable().defaultTo('ja')
    table.string('nickname').notNullable()
    table.boolean('isAdmin').notNullable().defaultTo(false)
    table.string('status').notNullable().defaultTo('')
    table.string('avatar').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
