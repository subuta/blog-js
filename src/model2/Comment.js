import Model from './Model'

export const register = (models) => {
  Comment.relationMappings = {}
}

export default class Comment extends Model {
  static tableName = 'comments'

  static jsonSchema = {
    title: 'Comment',
    $id: 'http://sub-labo.com/schemas/comment.json',
    type: 'object',
    required: ['text'],
    properties: {text: {type: 'string'}}
  }
}
