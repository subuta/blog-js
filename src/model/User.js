import Model from './Model'

export const register = (models) => {
  // then define relationMappings.
  User.relationMappings = {
    comments: {
      modelClass: models.Comment,
      relation: Model.HasManyRelation,
      join: {from: 'users.id', to: 'comments.commentedById'}
    }
  }
}

export default class User extends Model {
  static tableName = 'users'

  static jsonSchema = {
    title: 'User',
    $id: 'http://sub-labo.com/schemas/user.json',
    type: 'object',
    required: ['auth0Id', 'nickname'],
    properties: {
      id: {type: 'string'},
      auth0Id: {type: 'string'},
      locale: {type: 'string'},
      nickname: {type: 'string'},
      status: {type: 'string'},
      avatar: {type: 'string'},
      created_at: {type: 'string', format: 'date-time'},
      updated_at: {type: 'string', format: 'date-time'}
    }
  }
}
