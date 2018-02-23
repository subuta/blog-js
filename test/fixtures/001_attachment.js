exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('attachments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('attachments').insert([
    {
      id: 'Handmade driver',
      name: 'mobile invoice',
      type: 'Computers Senior Palau',
      imageUrl: 'http://lorempixel.com/640/480/transport'
    },
    {
      id: 'Practical Frozen Bacon deposit open architecture',
      name: 'Berkshire program transmitter',
      type: 'Investment Account JSON',
      imageUrl: 'http://lorempixel.com/640/480/abstract'
    },
    {
      id: 'calculating Orchestrator deposit',
      name: 'Communications Analyst Nebraska',
      type: 'Principal',
      imageUrl: 'http://lorempixel.com/640/480/people'
    }
  ])
}
