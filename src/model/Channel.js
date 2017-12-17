import { Model } from 'objection'

export const register = ({Comment}) => {
  Channel.relationMappings = {
    comments: {
      relation: Model.HasManyRelation,
      modelClass: Comment,
      join: {
        from: 'channels.id',
        to: 'comments.channelId'
      }
    },
  }
}

export default class Channel extends Model {
  static tableName = 'channels'
}
