exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 10295, label: 'uniform'},
    {id: 89794, label: 'Drive value-added tangible'},
    {id: 91264, label: 'ubiquitous'}
  ])
}
