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
      type: 'string'
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
