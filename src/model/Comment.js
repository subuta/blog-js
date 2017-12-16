export default {
  identity: 'comment',
  attributes: {
    name: {
      type: 'string'
    },

    channel: {
      model: 'channels'
    },

    commentedBy: {
      model: 'users'
    },

    attachment: {
      model: 'attachments'
    },

    text: {
      type: 'string'
    }
  }
}
