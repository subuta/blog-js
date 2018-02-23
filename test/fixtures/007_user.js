exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('users').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('users').insert([
    {
      id: 37436,
      auth0Id: 'systemic Belarussian Ruble',
      locale: 'en_BORK',
      nickname: 'Ernestina.Feeney51',
      status: 'withdrawal PCI morph',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/rweve/128.jpg'
    },
    {
      id: 58010,
      auth0Id: 'SDD',
      locale: 'pt_BR',
      nickname: 'Thora.Kreiger40',
      status: 'Plastic Awesome',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/aislinnkelly/128.jpg'
    },
    {
      id: 92666,
      auth0Id: 'Knoll',
      locale: 'sk',
      nickname: 'Ophelia.Dickens',
      status: 'initiatives',
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/kapaluccio/128.jpg'
    }
  ])
}
