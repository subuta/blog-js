import Model from './Model'

export default class Article extends Model {
  $parseDatabaseJson(json) {
    // Remember to call the super class's implementation.
    json = super.$parseDatabaseJson(json)
    // Parse boolean props.
    // SEE: https://github.com/Vincit/objection.js/issues/174
    json['isPublished'] = !!parseInt(json['isPublished'])
    return json
  }

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
      isPublished: {type: 'boolean'},
      content: {type: 'string'}
    }
  }
}
