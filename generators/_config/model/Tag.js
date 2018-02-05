export default {
  tableName: 'tags',
  required: [
    'label',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    label: {
      'type': 'string'
    }
  },

  relations: {
    articles: {
      hasAndBelongsToMany: 'articles',
      join: {
        from: 'tags.id',
        through: {
          from: 'article_tags.tagId',
          to: 'article_tags.articleId'
        },
        to: 'articles.id',
      }
    },
  }
}
