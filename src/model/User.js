import Model from './Model'

export const register = (models) => {
  User.relationMappings = {}
}

export default class User extends Model {
  static tableName = 'users'
}
