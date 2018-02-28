exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 92666,
      auth0Id: 'e376dc36-3072-45e7-84b0-8109641881ca',
      locale: 'vi',
      nickname: 'Tiffany.Erdman',
      status: 'turquoise revolutionize override',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/reetajayendra/128.jpg'
    },
    {
      id: 58010,
      auth0Id: '93d1ce7c-1651-4518-a382-b01458d25ee8',
      locale: 'it',
      nickname: 'Kory.Friesen75',
      status: 'Synergized Handmade',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/dallasbpeters/128.jpg'
    },
    {
      id: 37436,
      auth0Id: '564da235-3b38-4fa7-a554-a260bd71c365',
      locale: 'en_au_ocker',
      nickname: 'Garnet86',
      status: 'morph SMTP',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/chris_witko/128.jpg'
    }
  ])
}
