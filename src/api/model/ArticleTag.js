import Model from './Model'

export default class Articletag extends Model {
  // SEE: https://github.com/Vincit/objection.js/issues/825
  $parseDatabaseJson(db) {
    // Remember to call the super class's implementation.
    return super.$parseDatabaseJson(db)
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
}
