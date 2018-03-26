import Model from './Model'

export default class Attachment extends Model {
  $parseDatabaseJson(json) {
    // Remember to call the super class's implementation.
    json = super.$parseDatabaseJson(json)
    // Parse boolean props.
    // SEE: https://github.com/Vincit/objection.js/issues/174

    return json
  }

  static register = (models) => {
    // then define relationMappings.
    Attachment.relationMappings = {
      comment: {
        modelClass: models.Comment,
        relation: Model.BelongsToOneRelation,
        join: {from: 'attachments.id', to: 'comments.attachmentId'}
      }
    }
  }

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
