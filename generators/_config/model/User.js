export default {
  tableName: 'users',
  required: [
    'auth0Id',
    'nickname'
  ],

  properties: {
    id: {
      type: 'integer'
    },
    auth0Id: {
      type: 'string'
    },
    locale: {
      type: 'string',
      maxLength: 255
    },
    nickname: {
      type: 'string',
      minLength: 1,
      maxLength: 255
    },
    status: {
      type: 'string',
      maxLength: 255
    },
    isAdmin: {
      type: 'boolean',
      default: false
    },
    avatar: {
      type: 'string'
    }
  },

  hidden: [
    'auth0Id'
  ],

  relations: {
    comments: {
      hasMany: 'comments',
      join: {
        from: 'users.id',
        to: 'comments.commentedById'
      }
    }
  }
}
