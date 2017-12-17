import { Model } from 'objection'

export const register = (models) => {
  Comment.relationMappings = {}
}

export default class Comment extends Model {
  static tableName = 'comments'
}

// export default {
//   identity: 'comment',
//   attributes: {
//     name: {
//       type: 'string'
//     },
//
//     channel: {
//       model: 'channels'
//     },
//
//     commentedBy: {
//       model: 'users'
//     },
//
//     attachment: {
//       model: 'attachments'
//     },
//
//     text: {
//       type: 'string'
//     }
//   }
// }
