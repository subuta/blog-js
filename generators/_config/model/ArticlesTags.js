export default {
  tableName: 'articles_tags',
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
        from: 'articles_tags.tagId',
        to: 'tags.id',
      }
    },

    article: {
      belongsTo: 'article',
      join: {
        from: 'articles_tags.articleId',
        to: 'articles.id',
      }
    },
  }
}
