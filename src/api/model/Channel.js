import Model from './Model'
import _ from 'lodash'



export default class Channel extends Model {
  // SEE: https://github.com/Vincit/objection.js/issues/825
  $parseDatabaseJson(db) {
    // Remember to call the super class's implementation.
    const json = super.$parseDatabaseJson(db)

    return json
  }

  $formatDatabaseJson(json) {
    return super.$formatDatabaseJson(json)
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
      name: {type: 'string', minLength: 1, maxLength: 255},
      description: {type: 'string', maxLength: 255}
    }
  }

  /* mat Custom methods [start] */
  static namedFilters = {
    default: (builder) => builder
      .applyFilter('sortByCreatedAt'),

    sortByCreatedAt: (builder) => builder
      .orderBy('created_at', 'asc')
      .orderBy('id', 'asc')
  }
  /* mat Custom methods [end] */
}
