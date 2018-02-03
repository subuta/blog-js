import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Attachment.jsonSchema)
  // then define relationMappings.
  Attachment.relationMappings = {
    comment: {
      modelClass: models.Comment,
      relation: Model.BelongsToOneRelation,
      join: {from: 'attachments.id', to: 'comments.attachmentId'}
    }
  }
}

export default class Attachment extends Model {
  static tableName = 'attachments'

  static jsonSchema = {
    title: 'Attachment',
    $id: 'http://sub-labo.com/schemas/attachment.json',
    type: 'object',
    required: ['name', 'type', 'url'],
    properties: {
      id: {type: 'string'},
      name: {type: 'string'},
      type: {type: 'string'},
      url: {type: 'string'},
      created_at: {type: 'string', format: 'date-time'},
      updated_at: {type: 'string', format: 'date-time'},
      comment: {oneOf: [{type: 'null'}, {$ref: 'comment.json'}]}
    }
  }
}
