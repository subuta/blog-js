exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('reactions').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('reactions').insert([
    {
      id: 99729,
      emoji: 'open-source parsing',
      reactableId: 77184,
      reactableType: 'Brunei Darussalam capacitor synthesizing',
      reactedById: 61127
    },
    {
      id: 73507,
      emoji: 'International Berkshire',
      reactableId: 59536,
      reactableType: 'Optimization Square Refined',
      reactedById: 41841
    },
    {
      id: 61852,
      emoji: 'Senior Summit',
      reactableId: 61329,
      reactableType: 'Enterprise-wide',
      reactedById: 46540
    }
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
