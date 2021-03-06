export default {
  tableName: 'reactions',
  required: [
    'emoji'
  ],

  properties: {
    id: {
      type: 'integer'
    },
    emoji: {
      type: 'string',
      minLength: 1,
      maxLength: 255
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
