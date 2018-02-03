export default {
  tableName: 'attachments',
  required: [
    'name',
    'type',
    'url',
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
    url: {
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
    comment: {
      belongsTo: 'comment',
      join: {
        from: 'attachments.id',
        to: 'comments.attachmentId'
      }
    },
  }
}
