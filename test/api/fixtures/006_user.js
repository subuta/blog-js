exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 75900,
      auth0Id: 'e57308da-b81c-4e24-af84-6b963ccb8375',
      locale: 'sk',
      nickname: 'Ransom_Harris',
      status: 'Avon',
      isAdmin: true,
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/robbschiller/128.jpg'
    },
    {
      id: 1796,
      auth0Id: 'd1819c9a-0cef-4fa1-bf9b-0384bcb26ee6',
      locale: 'sv',
      nickname: 'Alexandro.Feeney41',
      status: 'online Uganda',
      isAdmin: false,
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/jonsgotwood/128.jpg'
    },
    {
      id: 25425,
      auth0Id: '3ce45e46-5489-4159-aea5-ed46e284339c',
      locale: 'nep',
      nickname: 'Fernando97',
      status: 'interfaces transmitting Vision-oriented',
      isAdmin: false,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg'
    }
  ])

  /* mat After seed [start] */
  await knex('users')
    .where({ id: 75900 })
    .update({ isAdmin: true })

  await knex('users')
    .where({ id: 1796 })
    .update({ isAdmin: false })
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
exports.ids = {
  'admin': 75900,
  'user': 1796
}
/* mat Custom exports [end] */
