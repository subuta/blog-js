export default {
  tableName: 'channels',
  required: [
    'name',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 255
    },
    description: {
      type: 'string',
      maxLength: 255
    }
  },

  relations: {
    comments: {
      hasMany: 'comments',
      join: {
        from: 'channels.id',
        to: 'comments.channelId'
      }
    },
  }
}
