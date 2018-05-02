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
      type: 'string',
      minLength: 1,
      maxLength: 255
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
