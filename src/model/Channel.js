export default {
  identity: 'channel',
  attributes: {
    name: {
      type: 'string'
    },

    comments: {
      collection: 'comments',
      via: 'channel'
    }
  }
}
