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
      'type': 'string'
    },
    nickname: {
      'type': 'string'
    },
    status: {
      'type': 'string'
    },
    avatar: {
      'type': 'string'
    }
  },

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
