import Model from './Model'

export default class Comment extends Model {
  $parseDatabaseJson(json) {
    // Remember to call the super class's implementation.
    json = super.$parseDatabaseJson(json)
    // Parse boolean props.
    // SEE: https://github.com/Vincit/objection.js/issues/174

    return json
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
}
