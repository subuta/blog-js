exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 91264, label: 'Garden Regional Public-key'},
    {id: 10295, label: 'directional'},
    {id: 89794, label: 'Architect Pants Home'}
  ])
}
