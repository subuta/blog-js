exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()
  await knex('channels').insert([
    {id: 1, name: 'i_subuta'},
    {id: 2, name: 'react'},
    {id: 3, name: 'redux'}
  ])
}
