export default {
  tableName: 'article_tags',
  required: [
    'articleId',
    'tagId',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    articleId: {
      type: 'integer'
    },
    tagId: {
      type: 'integer'
    },
  },

  relations: {
    tag: {
      belongsTo: 'tag',
      join: {
        from: 'article_tags.tagId',
        to: 'tags.id',
      }
    },

    article: {
      belongsTo: 'article',
      join: {
        from: 'article_tags.articleId',
        to: 'articles.id',
      }
    },
  }
}
