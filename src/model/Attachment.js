import { Model } from 'objection'

export const register = (models) => {
  Attachment.relationMappings = {}
}

export default class Attachment extends Model {
  static tableName = 'attachments'
}
