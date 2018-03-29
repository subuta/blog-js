exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles_tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles_tags').insert([
    {id: 48239, articleId: 76958, tagId: 82337},
    {id: 52023, articleId: 75213, tagId: 43149},
    {id: 37083, articleId: 52552, tagId: 3838}
  ])
}
