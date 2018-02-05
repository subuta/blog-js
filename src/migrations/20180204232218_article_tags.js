exports.up = function(knex, Promise) {
  return knex.schema.createTable('article_tags', function (table) {
    table.increments()
    table.integer('articleId').references('articles.id').onDelete('CASCADE')
    table.integer('tagId').references('tags.id').onDelete('CASCADE')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('article_tags')
};
