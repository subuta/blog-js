import Model from './Model'

export const register = (models) => {
  Channel.relationMappings = {}
}

export default class Channel extends Model {
  static tableName = 'channels'

  static jsonSchema = {
    title: 'Channel',
    $id: 'http://sub-labo.com/schemas/channel.json',
    type: 'object',
    required: ['name'],
    properties: {id: {type: 'integer'}, name: {type: 'string'}}
  }
}
