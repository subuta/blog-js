import { Model } from 'objection'

export const register = (models) => {
  User.relationMappings = {}
}

export default class User extends Model {
  static tableName = 'users'
}

// export default {
//   identity: 'user',
//   attributes: {
//     auth0Id: {
//       type: 'string'
//     },
//
//     locale: {
//       type: 'string',
//       defaultsTo: 'ja'
//     },
//
//     nickname: {
//       type: 'string'
//     },
//
//     status: {
//       type: 'string',
//       defaultsTo: ''
//     },
//
//     avatar: {
//       type: 'string'
//     }
//   }
// }
