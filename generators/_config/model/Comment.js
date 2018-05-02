export default {
  tableName: 'comments',
  required: [
    'text',
  ],

  properties: {
    id: {
      type: 'integer'
    },
    text: {
      type: 'string',
      minLength: 1
    }
  },

  relations: {
    channel: {
      belongsTo: 'channels',
      join: {
        from: 'comments.channelId',
        to: 'channels.id'
      }
    },

    commentedBy: {
      belongsTo: 'users',
      join: {
        from: 'comments.commentedById',
        to: 'users.id'
      }
    },

    attachment: {
      hasOne: 'attachment',
      join: {
        from: 'comments.attachmentId',
        to: 'attachments.id'
      }
    },

    reactions: {
      hasMany: 'reactions',
      morphAs: 'reactable',
      join: {
        from: 'comments.id',
        to: 'reactions.reactableId'
      }
    }
  }
}
