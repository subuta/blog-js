import Model from './Model'

export default class User extends Model {
  $parseDatabaseJson(json) {
    // Remember to call the super class's implementation.
    json = super.$parseDatabaseJson(json)
    // Parse boolean props.
    // SEE: https://github.com/Vincit/objection.js/issues/174

    return json
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
