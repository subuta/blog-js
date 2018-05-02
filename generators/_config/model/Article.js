export default {
  tableName: 'articles',
  required: [
    'title',
    'slug',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255
    },
    summary: {
      type: 'string',
      default: '',
      // for og:content
      maxLength: 300
    },
    slug: {
      type: 'string',
      minLength: 1,
      maxLength: 255
    },
    isPublished: {
      type: 'boolean',
      default: false
    },
    content: {
      type: 'string',
      default: ''
    }
  },

  relations: {
    tags: {
      hasAndBelongsToMany: 'tags',
      join: {
        from: 'articles.id',
        through: {
          from: 'articles_tags.articleId',
          to: 'articles_tags.tagId'
        },
        to: 'tags.id',
      }
    },

    author: {
      belongsTo: 'users',
      join: {
        from: 'articles.authorId',
        to: 'users.id'
      }
    },

    reactions: {
      hasMany: 'reactions',
      morphAs: 'reactable',
      join: {
        from: 'articles.id',
        to: 'reactions.reactableId'
      }
    }
  }
}
