export default {
  identity: 'attachment',
  attributes: {
    id: {
      type: 'string',
      unique: true
    },

    name: {
      type: 'string'
    },

    type: {
      type: 'string'
    },

    url: {
      type: 'string'
    }
  }
}
