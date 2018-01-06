export default {
  title: 'Attachment',
  $id: 'http://sub-labo.com/schemas/attachment.json',
  type: 'object',
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
    },
    comments: {
      type: ['array', 'null'],
      items: {
        __$refType: 'belongsTo',
        $ref: 'comment.json'
      }
    }
  }
}
