exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 1,
      channelId: 1,
      commentedById: 1,
      text: 'lorem ipsum'
    },

    {
      id: 2,
      channelId: 1,
      commentedById: 1,
      text: '',
      attachmentId: 'xxxx-xxxx-xxxx-xxxx'
    },
  ])
}
