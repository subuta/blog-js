exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 17123, name: 'Shoes'},
    {id: 34300, name: 'explicit'},
    {id: 54783, name: 'communities'}
  ])
}
