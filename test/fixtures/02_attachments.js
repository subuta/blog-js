exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('attachments').del()
  await knex('attachments').insert([
    {
      id: 'xxxx-xxxx-xxxx-xxxx',
      name: 'hoge.png',
      type: 'image/png',
      url: 'http://lorempixel.com/200/200/cats/',
    },
  ])
}
