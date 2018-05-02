exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles_tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles_tags').insert([
    {id: 48239, articleId: 24271, tagId: 71041},
    {id: 52023, articleId: 48587, tagId: 58582},
    {id: 37083, articleId: 67738, tagId: 25050}
  ])

  /* mat After seed [start] */
  /* mat After seed [end] */
}

/* mat Custom exports [start] */
/* mat Custom exports [end] */
