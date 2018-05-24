import Model from './Model'
import _ from 'lodash'



export default class Articletag extends Model {
  // SEE: https://github.com/Vincit/objection.js/issues/825
  $parseDatabaseJson(db) {
    // Remember to call the super class's implementation.
    const json = super.$parseDatabaseJson(db)

    return json
  }

  $formatDatabaseJson(json) {
    return super.$formatDatabaseJson(json)
  }

  static register = (models) => {
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

  /* mat Custom methods [start] */
  /* mat Custom methods [end] */
}
