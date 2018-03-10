exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 68264, name: 'convergence Administrator Clothing'},
    {id: 36069, name: 'Baby Lead solutions'},
    {id: 63669, name: 'functionalities'}
  ])
}
