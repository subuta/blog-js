exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('tags').insert([
    {id: 82337, label: 'Handcrafted Granite Salad'},
    {id: 43149, label: 'upward-trending RAM SMTP'},
    {id: 3838, label: 'Liaison Pants'}
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
