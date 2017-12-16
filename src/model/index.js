export const DEFAULT_SETTING = {
  primaryKey: 'id',
  datastore: 'default',
  autoPK: false,
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true
    }
  }
}

export default {
  attachments: {
    attributes: {
      id: {
        type: 'string',
        unique: true,
        primaryKey: true,
        required: true
      },

      name: {
        type: 'string',
        required: true
      },

      type: {
        type: 'string',
        required: true
      },

      url: {
        type: 'string',
        required: true
      }
    }
  },

  channels: {
    attributes: {
      name: {
        type: 'string',
        required: true
      },

      comments: {
        collection: 'comment',
        via: 'channel'
      }
    }
  },

  comments: {
    attributes: {
      name: {
        type: 'string',
        required: true
      },

      channel: {
        model: 'channel',
        required: true
      },

      commentedBy: {
        model: 'user',
        required: true
      },

      attachment: {
        model: 'attachment',
        required: false
      },

      text: {
        type: 'string',
        required: true
      }
    }
  },

  users: {
    attributes: {
      auth0Id: {
        type: 'text',
        required: true
      },

      locale: {
        type: 'string',
        required: true,
        defaultsTo: 'ja'
      },

      nickname: {
        type: 'string',
        required: true
      },

      status: {
        type: 'string',
        required: true,
        defaultsTo: ''
      },

      avatar: {
        type: 'string',
        required: true
      }
    }
  }
}
