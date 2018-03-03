import Model from './Model'

export default class Channel extends Model {
  static register = (models) => {
    // then define relationMappings.
    Channel.relationMappings = {
      comments: {
        modelClass: models.Comment,
        relation: Model.HasManyRelation,
        join: {from: 'channels.id', to: 'comments.channelId'}
      }
    }
  }

  static tableName = 'channels'

  static jsonSchema = {
    title: 'Channel',
    $id: 'http://sub-labo.com/schemas/channel.json',
    type: 'object',
    required: ['name'],
    properties: {id: {type: 'integer'}, name: {type: 'string'}}
  }
}
