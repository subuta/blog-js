import Model from './Model'

export const register = (models) => {
  // then define relationMappings.
  Articletag.relationMappings = {
    tag: {
      modelClass: models.Tag,
      relation: Model.BelongsToOneRelation,
      join: {from: 'article_tags.tagId', to: 'tags.id'}
    },
    article: {
      modelClass: models.Article,
      relation: Model.BelongsToOneRelation,
      join: {from: 'article_tags.articleId', to: 'articles.id'}
    }
  }
}

export default class Articletag extends Model {
  static tableName = 'article_tags'

  static jsonSchema = {
    title: 'ArticleTag',
    $id: 'http://sub-labo.com/schemas/article_tag.json',
    type: 'object',
    required: ['articleId', 'tagId'],
    properties: {
      id: {type: 'integer'},
      articleId: {type: 'integer'},
      tagId: {type: 'integer'}
    }
  }
}
