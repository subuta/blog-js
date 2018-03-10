exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles_tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles_tags').insert([
    {id: 48239, articleId: 68554, tagId: 82337},
    {id: 52023, articleId: 68018, tagId: 43149},
    {id: 37083, articleId: 96438, tagId: 3838}
  ])
}
