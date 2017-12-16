export default {
  identity: 'user',
  attributes: {
    auth0Id: {
      type: 'string'
    },

    locale: {
      type: 'string',
      defaultsTo: 'ja'
    },

    nickname: {
      type: 'string'
    },

    status: {
      type: 'string',
      defaultsTo: ''
    },

    avatar: {
      type: 'string'
    }
  }
}
