exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('article_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('article_tags').insert([
        {id: 1, articleId: 1, tagId: 1}
      ]);
    });
};
