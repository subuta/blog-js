import Model from './Model'
import _ from 'lodash'

export default class Tag extends Model {
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
    Tag.relationMappings = {
      articles: {
        modelClass: models.Article,
        relation: Model.ManyToManyRelation,
        join: {
          from: 'tags.id',
          through: {from: 'articles_tags.tagId', to: 'articles_tags.articleId'},
          to: 'articles.id'
        }
      }
    }
  }

  static tableName = 'tags'

  static jsonSchema = {
    title: 'Tag',
    $id: 'http://sub-labo.com/schemas/tag.json',
    type: 'object',
    required: ['label'],
    properties: {id: {type: 'integer'}, label: {type: 'string'}}
  }

  /* mat Custom methods [start] */
  /* mat Custom methods [end] */
}
