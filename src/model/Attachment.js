import { Model } from 'objection'

export const register = (models) => {
  Attachment.relationMappings = {}
}

export default class Attachment extends Model {
  static tableName = 'attachments'
}

// export default {
//   identity: 'attachment',
//   attributes: {
//     id: {
//       type: 'string',
//       unique: true
//     },
//
//     name: {
//       type: 'string'
//     },
//
//     type: {
//       type: 'string'
//     },
//
//     url: {
//       type: 'string'
//     }
//   }
// }
