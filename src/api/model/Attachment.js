import Model from './Model'
import _ from 'lodash'

export default class Attachment extends Model {
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

  /* mat Custom methods [start] */
  /* mat Custom methods [end] */
}
