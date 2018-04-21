exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('attachments').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('attachments').insert([
    {
      id: '28d15c5a-a70c-48e4-9772-bc910f421907',
      name: 'one-to-one',
      type: 'embrace',
      imageUrl: 'http://lorempixel.com/640/480/nature'
    },
    {
      id: 'abfbc020-04b2-4d70-a1ed-aa85e702e181',
      name: 'payment feed Delaware',
      type: 'HDD Florida',
      imageUrl: 'http://lorempixel.com/640/480/fashion'
    },
    {
      id: '62fc4caf-224d-4658-949e-b68307f974d2',
      name: 'Enterprise-wide feed circuit',
      type: 'Tasty Frozen Gloves plug-and-play Berkshire',
      imageUrl: 'http://lorempixel.com/640/480/abstract'
    }
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
