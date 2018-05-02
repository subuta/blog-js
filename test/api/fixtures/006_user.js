exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 61127,
      auth0Id: 'ecc04041-8e1d-4a05-8078-eea261323182',
      locale: 'sv',
      nickname: 'Marcelino80',
      status: 'white Cayman Islands Dollar',
      isAdmin: true,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/low_res/128.jpg'
    },
    {
      id: 41841,
      auth0Id: '4c275aa7-2103-487d-a33c-f6a2b9ffdae2',
      locale: 'ge',
      nickname: 'Etha46',
      status: 'Handmade quantifying',
      isAdmin: false,
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/mtolokonnikov/128.jpg'
    },
    {
      id: 46540,
      auth0Id: '18a3458d-7b67-4db5-8652-72a271f4a410',
      locale: 'fa',
      nickname: 'Elva99',
      status: 'benchmark',
      isAdmin: false,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/mizko/128.jpg'
    }
  ])


}

/* mat Custom exports [start] */
exports.ids = {
  'admin': 61127,
  'user': 41841
}
/* mat Custom exports [end] */
