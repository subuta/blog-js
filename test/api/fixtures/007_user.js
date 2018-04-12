exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 54551,
      auth0Id: '4be76d72-37c6-4af4-9b6d-5cf3cb62d63a',
      locale: 'en_au_ocker',
      nickname: 'Juana5',
      status: 'New Israeli Sheqel',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/devankoshal/128.jpg'
    },
    {
      id: 15599,
      auth0Id: 'e5ad378c-913f-4366-bb72-507428a10360',
      locale: 'en_BORK',
      nickname: 'Shanel.Barton',
      status: 'web-enabled',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/antongenkin/128.jpg'
    },
    {
      id: 34490,
      auth0Id: 'c5d5096e-8b5e-4c16-9cc6-f15cf8fdcef5',
      locale: 'en_au_ocker',
      nickname: 'Marisol66',
      status: 'Mobility Missouri Administrator',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/dgajjar/128.jpg'
    }
  ])
}
