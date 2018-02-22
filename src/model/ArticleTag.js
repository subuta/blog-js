import Model from './Model'

export const register = (models) => {
  // then define relationMappings.
  Articletag.relationMappings = {
    tag: {
      modelClass: models.Tag,
      relation: Model.BelongsToOneRelation,
      join: {from: 'articles_tags.tagId', to: 'tags.id'}
    },
    article: {
      modelClass: models.Article,
      relation: Model.BelongsToOneRelation,
      join: {from: 'articles_tags.articleId', to: 'articles.id'}
    }
  }
}

export default class Articletag extends Model {
  static tableName = 'articles_tags'

  static jsonSchema = {
    title: 'ArticlesTag',
    $id: 'http://sub-labo.com/schemas/articles_tag.json',
    type: 'object',
    required: ['articleId', 'tagId'],
    properties: {
      id: {type: 'integer'},
      articleId: {type: 'integer'},
      tagId: {type: 'integer'}
    }
  }
}
