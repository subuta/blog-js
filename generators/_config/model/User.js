export default {
  tableName: 'users',
  required: [
    'auth0Id',
    'nickname'
  ],

  properties: {
    id: {
      type: 'string'
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
    },
    created_at: {
      type: 'string',
      format: 'date-time'
    },
    updated_at: {
      type: 'string',
      format: 'date-time'
    }
  },

  relations: {
    comments: {
      hasMany: 'comments',
      join: {
        from: 'users.id',
        to: 'comments.commentedById'
      }
    },
  }
}
