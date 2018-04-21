import Model from './Model'
import _ from 'lodash'

export default class Comment extends Model {
  // SEE: https://github.com/Vincit/objection.js/issues/825
  $parseDatabaseJson(db) {
    // Remember to call the super class's implementation.
    const json = super.$parseDatabaseJson(db)

    return json
  }

  $formatDatabaseJson(json) {
    return super.$formatDatabaseJson(json)
  }

  static register = (models) => {
    // then define relationMappings.
    Comment.relationMappings = {
      channel: {
        modelClass: models.Channel,
        relation: Model.BelongsToOneRelation,
        join: {from: 'comments.channelId', to: 'channels.id'}
      },
      commentedBy: {
        modelClass: models.User,
        relation: Model.BelongsToOneRelation,
        join: {from: 'comments.commentedById', to: 'users.id'}
      },
      attachment: {
        modelClass: models.Attachment,
        relation: Model.HasOneRelation,
        join: {from: 'comments.attachmentId', to: 'attachments.id'}
      },
      reactions: {
        modelClass: models.Reaction,
        relation: Model.HasManyRelation,
        filter: {
          reactableType: 'Comment'
        },
        beforeInsert: (model) => {
          model.reactableType = 'Comment'
        },
        join: {from: 'comments.id', to: 'reactions.reactableId'}
      }
    }
  }

  static tableName = 'comments'

  static jsonSchema = {
    title: 'Comment',
    $id: 'http://sub-labo.com/schemas/comment.json',
    type: 'object',
    required: ['text'],
    properties: {id: {type: 'integer'}, text: {type: 'string'}}
  }

  /* mat Custom methods [start] */
  static namedFilters = {
    last30: (builder) => builder
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .limit(30)
  }
  /* mat Custom methods [end] */
}
