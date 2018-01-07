// こんな風に定義出来るようにする。
// tableName = Objectionのテーブル名
// required = jsonSchemaのrequired
// properties = jsonSchemaのproperties
// relations = ObjectionのrelationMappings
// relationsから$refのvalidationも生成出来ると良さそう。

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
    channel: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'Channel',
      join: {
        from: 'comments.channelId',
        to: 'channels.id'
      }
    },

    commentedBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: {
        from: 'comments.commentedById',
        to: 'users.id'
      }
    },

    attachment: {
      relation: Model.HasOneRelation,
      modelClass: 'Attachment',
      join: {
        from: 'comments.attachmentId',
        to: 'attachments.id'
      }
    },
  }
}
