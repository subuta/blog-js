import { Model } from 'objection'

export const register = (models) => {
  Channel.relationMappings = {}
}

export default class Channel extends Model {
  static tableName = 'channels'
}

// export default {
//   identity: 'channel',
//   attributes: {
//     name: {
//       type: 'string'
//     },
//
//     comments: {
//       collection: 'comments',
//       via: 'channel'
//     }
//   }
// }
