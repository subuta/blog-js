import Model from './Model'

export const register = (models) => {
  // then define relationMappings.
  Tag.relationMappings = {
    articles: {
      modelClass: models.Article,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'tags.id',
        through: {from: 'article_tags.tagId', to: 'article_tags.articleId'},
        to: 'articles.id'
      }
    }
  }
}

export default class Tag extends Model {
  static tableName = 'tags'

  static jsonSchema = {
    title: 'Tag',
    $id: 'http://sub-labo.com/schemas/tag.json',
    type: 'object',
    required: ['label'],
    properties: {id: {type: 'integer'}, label: {type: 'string'}}
  }
}
