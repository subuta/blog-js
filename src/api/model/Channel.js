import Model from './Model'

export default class Channel extends Model {
  $parseDatabaseJson(json) {
    // Remember to call the super class's implementation.
    json = super.$parseDatabaseJson(json)
    // Parse boolean props.
    // SEE: https://github.com/Vincit/objection.js/issues/174

    return json
  }

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
    properties: {
      id: {type: 'integer'},
      name: {type: 'string'},
      description: {type: 'string'}
    }
  }
}
