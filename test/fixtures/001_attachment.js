exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('attachments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('attachments').insert([
    {
      id: 'e06fda25-bf75-4b3b-8897-de04a0f02280',
      name: 'Practical Frozen Bacon deposit open architecture',
      type: 'Practical Frozen Bacon deposit open architecture',
      imageUrl: 'http://lorempixel.com/640/480/technics'
    },
    {
      id: 'bdbf9a3f-f9f7-4981-afac-a1931a57af40',
      name: 'calculating Orchestrator deposit',
      type: 'calculating Orchestrator deposit',
      imageUrl: 'http://lorempixel.com/640/480/nature'
    },
    {
      id: '51cb0acf-acb0-44e0-8aed-601243b1bae3',
      name: 'Handmade driver',
      type: 'Handmade driver',
      imageUrl: 'http://lorempixel.com/640/480/city'
    }
  ])
}
