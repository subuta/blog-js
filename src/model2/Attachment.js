import Model from './Model'

export const register = (models) => {
  Attachment.relationMappings = {}
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
      comments: {type: ['array', 'null'], items: {$ref: 'comment.json'}}
    }
  }
}
