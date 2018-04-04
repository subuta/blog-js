exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 82160, name: 'ball', description: 'Customer'},
    {id: 93680, name: 'salad', description: 'hacking Corporate bandwidth'},
    {
      id: 58071,
      name: 'salmon',
      description: 'Awesome Fresh Pizza focus group optimize'
    }
  ])
}
