export default {
  tableName: 'articles',
  required: [
    'title',
    'content',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    title: {
      'type': 'string'
    },
    content: {
      'type': 'string'
    }
  },

  relations: {
    tags: {
      hasAndBelongsToMany: 'tags',
      join: {
        from: 'articles.id',
        through: {
          from: 'article_tags.articleId',
          to: 'article_tags.tagId'
        },
        to: 'tags.id',
      }
    },
  }
}
