import Model from './Model'

export default class Article extends Model {
  static register = (models) => {
    // then define relationMappings.
    Article.relationMappings = {
      tags: {
        modelClass: models.Tag,
        relation: Model.ManyToManyRelation,
        join: {
          from: 'articles.id',
          through: {from: 'articles_tags.articleId', to: 'articles_tags.tagId'},
          to: 'tags.id'
        }
      }
    }
  }

  static tableName = 'articles'

  static jsonSchema = {
    title: 'Article',
    $id: 'http://sub-labo.com/schemas/article.json',
    type: 'object',
    required: ['title', 'content'],
    properties: {
      id: {type: 'integer'},
      title: {type: 'string'},
      summary: {type: 'string'},
      content: {type: 'string'}
    }
  }
}
