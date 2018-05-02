exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('channels').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('channels').insert([
    {id: 93290, name: 'holistic', description: 'Central'},
    {id: 76939, name: 'archive', description: 'Beauty copying'},
    {id: 17648, name: 'intranet', description: 'Avon India'}
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
