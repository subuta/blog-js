exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles_tags', function (table) {
    table.increments()
    table.integer('articleId').references('articles.id').onDelete('CASCADE')
    table.integer('tagId').references('tags.id').onDelete('CASCADE')
    table.timestamps(true, true)

    table.unique(['tagId', 'articleId'])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('articles_tags')
};
