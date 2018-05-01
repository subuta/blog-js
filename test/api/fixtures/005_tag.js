exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 82337, label: 'eos-veritatis-soluta'},
    {id: 43149, label: 'voluptatibus-nostrum-molestiae'},
    {id: 3838, label: 'et-maiores-qui'}
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
