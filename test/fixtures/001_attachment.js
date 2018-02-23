exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('attachments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('attachments').insert([
    {
      id: 17123,
      name: 'Jordanian Dinar',
      type: 'olive Pakistan',
      imageUrl: 'http://lorempixel.com/640/480/transport'
    },
    {
      id: 34300,
      name: 'IB killer',
      type: 'task-force',
      imageUrl: 'http://lorempixel.com/640/480/nightlife'
    },
    {
      id: 54783,
      name: 'Ball',
      type: 'AGP Assistant attitude',
      imageUrl: 'http://lorempixel.com/640/480/transport'
    }
  ])
}
