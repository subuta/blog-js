import Model from './Model'

export const register = (models) => {
  User.relationMappings = {}
}

export default class User extends Model {
  static tableName = 'users'

  static jsonSchema = {
    title: 'User',
    $id: 'http://sub-labo.com/schemas/user.json',
    type: 'object',
    required: ['comments'],
    properties: {
      comments: {
        type: ['array', 'null'],
        items: {__$refType: 'belongsTo', $ref: 'comment.json'}
      }
    }
  }
}
