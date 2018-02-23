exports.seed = async (knex) => {
  // Deletes ALL and insert entries.
  await knex('articles_tags').del()

  // https://github.com/tgriesser/knex/issues/54
  await knex('articles_tags').insert([
    {id: 48239, articleId: 36084, tagId: 91264},
    {id: 52023, articleId: 6898, tagId: 10295},
    {id: 37083, articleId: 14780, tagId: 89794}
  ])
}
