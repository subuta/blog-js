export default {
  title: 'User',
  $id: 'http://sub-labo.com/schemas/user.json',
  type: 'object',
  required: [
    'comments'
  ],
  properties: {
    comments: {
      type: ['array', 'null'],
      items: {
        __$refType: 'belongsTo',
        $ref: 'comment.json'
      }
    }
  }
}
