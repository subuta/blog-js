import Model from './Model'

export const register = (models) => {
  Attachment.relationMappings = {}
}

export default class Attachment extends Model {
  static tableName = 'attachments'
}
