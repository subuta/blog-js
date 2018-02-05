import Model from './Model'

export const register = (models) => {
  // then define relationMappings.
  Article.relationMappings = {
    tags: {
      modelClass: models.Tag,
      relation: Model.ManyToManyRelation,
      join: {
        from: 'articles.id',
        through: {from: 'article_tags.articleId', to: 'article_tags.tagId'},
        to: 'tags.id'
      }
    }
  }
}

export default class Article extends Model {
  static tableName = 'articles'

  static jsonSchema = {
    title: 'Article',
    $id: 'http://sub-labo.com/schemas/article.json',
    type: 'object',
    required: ['title', 'content'],
    properties: {
      id: {type: 'integer'},
      title: {type: 'string'},
      content: {type: 'string'}
    }
  }
}
