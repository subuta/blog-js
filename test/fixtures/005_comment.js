exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('comments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('comments').insert([
    {
      id: 54783,
      text:
        'Doloribus consequuntur quos saepe voluptate quibusdam est et. Aut officiis dolores officiis necessitatibus vel. Aut maxime consequatur facilis voluptas ex aspernatur est et rerum. Eius inventore in eius et dolor et praesentium molestiae quis. Sed modi recusandae quidem.',
      channelId: 31156,
      commentedById: 92666,
      attachmentId: 'e06fda25-bf75-4b3b-8897-de04a0f02280'
    },
    {
      id: 34300,
      text:
        'Nesciunt ea quisquam sed et repudiandae. Cumque facere earum repudiandae nam cum. Assumenda occaecati accusantium eligendi. Eum possimus odit eum necessitatibus nulla ut est.',
      channelId: 99821,
      commentedById: 58010,
      attachmentId: 'bdbf9a3f-f9f7-4981-afac-a1931a57af40'
    },
    {
      id: 17123,
      text:
        'Laboriosam quisquam ut amet. Laboriosam autem animi quia autem. Quam iure aut molestiae laborum aut eos reiciendis.',
      channelId: 54787,
      commentedById: 37436,
      attachmentId: '51cb0acf-acb0-44e0-8aed-601243b1bae3'
    }
  ])
}
