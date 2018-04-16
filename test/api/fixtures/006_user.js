exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 83,
      auth0Id: '3b0b2519-d80d-430a-8688-9cc37b09c36b',
      locale: 'pt_BR',
      nickname: 'Frida37',
      status: 'clicks-and-mortar',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/rob_thomas10/128.jpg'
    },
    {
      id: 96532,
      auth0Id: '3720f07a-a128-4089-886c-64ad95f7116b',
      locale: 'id_ID',
      nickname: 'Vallie_Kuphal',
      status: 'Cook Islands Pants B2C',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/matkins/128.jpg'
    },
    {
      id: 48632,
      auth0Id: '0ac720ab-8579-49c1-a789-ed20a3f50aea',
      locale: 'it',
      nickname: 'Samson_Langosh',
      status: 'payment compress',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/pifagor/128.jpg'
    }
  ])
}
