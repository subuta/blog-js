export default {
  tableName: 'attachments',
  required: [
    'name',
    'type',
    'imageUrl',
  ],

  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    type: {
      'type': 'string'
    },
    imageUrl: {
      'type': 'string'
    }
  },

  relations: {
    comment: {
      belongsTo: 'comment',
      join: {
        from: 'attachments.id',
        to: 'comments.attachmentId'
      }
    }
  }
}
