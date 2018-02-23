import Model from './Model'

export const register = (models) => {
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
    required: ['name', 'type', 'imageUrl'],
    properties: {
      id: {type: 'string'},
      name: {type: 'string'},
      type: {type: 'string'},
      imageUrl: {type: 'string'}
    }
  }
}
