import Model from './Model'
import _ from 'lodash'

export default class Reaction extends Model {
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
    Reaction.relationMappings = {
      reactedBy: {
        modelClass: models.User,
        relation: Model.BelongsToOneRelation,
        join: {from: 'reactions.reactedById', to: 'users.id'}
      }
    }
  }

  static tableName = 'reactions'

  static jsonSchema = {
    title: 'Reaction',
    $id: 'http://sub-labo.com/schemas/reaction.json',
    type: 'object',
    required: ['reactableId', 'reactableType', 'emoji'],
    properties: {
      id: {type: 'integer'},
      emoji: {type: 'string', minLength: 1},
      reactableId: {type: 'integer'},
      reactableType: {type: 'string'}
    }
  }
}
