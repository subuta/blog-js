import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Channel.jsonSchema)
  // then define relationMappings.
  Channel.relationMappings = {
    comments: {
      modelClass: models.Comment,
      relation: Model.HasManyRelation,
      join: {from: 'channels.id', to: 'comments.channelId'}
    }
  }
}

export default class Channel extends Model {
  static tableName = 'channels'

  static jsonSchema = {
    title: 'Channel',
    $id: 'http://sub-labo.com/schemas/channel.json',
    type: 'object',
    required: ['name'],
    properties: {
      id: {type: 'integer'},
      name: {type: 'string'},
      comments: {type: ['array', 'null'], items: [{$ref: 'comment.json'}]}
    }
  }
}
