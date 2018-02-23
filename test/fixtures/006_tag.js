exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 6898, label: 'Alabama'},
    {id: 14780, label: 'Administrator Regional orchid'},
    {id: 36084, label: 'Networked'}
  ])
}
