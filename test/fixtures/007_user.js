exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 17123,
      auth0Id: 'Shoes',
      locale: 'de_AT',
      nickname: 'Coy67',
      status: 'Bedfordshire Kyat',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg'
    },
    {
      id: 34300,
      auth0Id: 'explicit',
      locale: 'nep',
      nickname: 'Edgar_Hagenes',
      status: 'killer Function-based Optimization',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/thiagovernetti/128.jpg'
    },
    {
      id: 54783,
      auth0Id: 'communities',
      locale: 'en_AU',
      nickname: 'Deondre.Reichel98',
      status: 'attitude Applications Wyoming',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/mirfanqureshi/128.jpg'
    }
  ])
}
