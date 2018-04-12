export default {
  tableName: 'reactions',
  required: [
    'reactableId',
    'reactableType',
    'emoji',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    emoji: {
      'type': 'string',
      'minLength': 1
    },
    reactableId: {
      type: 'integer'
    },
    reactableType: {
      type: 'string'
    }
  },

  relations: {
    reactedBy: {
      belongsTo: 'users',
      join: {
        from: 'reactions.reactedById',
        to: 'users.id'
      }
    },
  }
}
