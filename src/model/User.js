import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(User.jsonSchema)
  // then define relationMappings.
  User.relationMappings = {
    commentedBy: {
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
      updated_at: {type: 'string', format: 'date-time'},
      commentedBy: {type: ['array', 'null'], items: [{$ref: 'comment.json'}]}
    }
  }
}
