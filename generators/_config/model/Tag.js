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
          from: 'articles_tags.tagId',
          to: 'articles_tags.articleId'
        },
        to: 'articles.id',
      }
    },
  }
}
