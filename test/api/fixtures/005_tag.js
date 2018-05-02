exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 71041, label: 'et-veniam-et'},
    {id: 58582, label: 'id-eius-provident'},
    {id: 25050, label: 'omnis-accusamus-eveniet'}
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
