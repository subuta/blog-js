exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 1,
      channel: 1,
      commentedBy: 1,
      text: 'lorem ipsum'
    },
  ])
}
