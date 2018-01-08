import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Comment.jsonSchema)
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

export default class Comment extends Model {
  static tableName = 'comments'

  static jsonSchema = {
    title: 'Comment',
    $id: 'http://sub-labo.com/schemas/comment.json',
    type: 'object',
    required: ['text'],
    properties: {
      id: {type: 'integer'},
      text: {type: 'string'},
      channel: {oneOf: [{type: 'null'}, {$ref: 'channel.json'}]},
      commentedBy: {oneOf: [{type: 'null'}, {$ref: 'user.json'}]},
      attachment: {oneOf: [{type: 'null'}, {$ref: 'attachment.json'}]}
    }
  }
}
