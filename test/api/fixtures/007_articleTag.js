exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles_tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles_tags').insert([
    {id: 48239, articleId: 14129, tagId: 82337},
    {id: 52023, articleId: 85002, tagId: 43149},
    {id: 37083, articleId: 73427, tagId: 3838}
  ])
}
