import Model from './Model'
import _ from 'lodash'

export default class Article extends Model {
  // SEE: https://github.com/Vincit/objection.js/issues/825
  $parseDatabaseJson(db) {
    // Remember to call the super class's implementation.
    const json = super.$parseDatabaseJson(db)

    if (_.isNumber(parseInt(json['isPublished']))) {
      json['isPublished'] = !!json['isPublished']
    }

    return json
  }

  $formatDatabaseJson(json) {
    return super.$formatDatabaseJson(json)
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
      slug: {type: 'string'},
      isPublished: {type: 'boolean'},
      content: {type: 'string'}
    }
  }
}
