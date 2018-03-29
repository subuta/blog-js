import Model from './Model'
import _ from 'lodash'

export default class User extends Model {
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
    User.relationMappings = {
      comments: {
        modelClass: models.Comment,
        relation: Model.HasManyRelation,
        join: {from: 'users.id', to: 'comments.commentedById'}
      }
    }
  }

  static tableName = 'users'

  static jsonSchema = {
    title: 'User',
    $id: 'http://sub-labo.com/schemas/user.json',
    type: 'object',
    required: ['auth0Id', 'nickname'],
    properties: {
      id: {type: 'integer'},
      auth0Id: {type: 'string'},
      locale: {type: 'string'},
      nickname: {type: 'string'},
      status: {type: 'string'},
      avatar: {type: 'string'}
    }
  }
}
