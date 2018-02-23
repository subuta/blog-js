exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0Id: 'google-oauth2|dummy',
      locale: 'ja',
      nickname: 'subuta',
      status: 'happy coding :)',
      avatar: 'http://lorempixel.com/200/200/cats/',
    },
  ])
}
