exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 65979,
      auth0Id: 'a699f07d-803c-4ede-8625-156c632fa035',
      locale: 'de_CH',
      nickname: 'Marilyne.Ward',
      status: 'e-services',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/manekenthe/128.jpg'
    },
    {
      id: 79221,
      auth0Id: '5007908f-5269-4e73-a0f2-cb56c90a93f0',
      locale: 'ge',
      nickname: 'Alda_Oberbrunner',
      status: 'online Small convergence',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ateneupopular/128.jpg'
    },
    {
      id: 29687,
      auth0Id: 'fcc7f983-ed1b-40de-b2eb-0adc4ab135f8',
      locale: 'tr',
      nickname: 'Julian.Buckridge',
      status: 'overriding',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/irae/128.jpg'
    }
  ])
}
