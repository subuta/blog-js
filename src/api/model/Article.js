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
      },
      author: {
        modelClass: models.User,
        relation: Model.BelongsToOneRelation,
        join: {from: 'articles.authorId', to: 'users.id'}
      },
      reactions: {
        modelClass: models.Reaction,
        relation: Model.HasManyRelation,
        filter: {
          reactableType: 'Article'
        },
        beforeInsert: (model) => {
          model.reactableType = 'Article'
        },
        join: {from: 'articles.id', to: 'reactions.reactableId'}
      }
    }
  }

  static tableName = 'articles'

  static jsonSchema = {
    title: 'Article',
    $id: 'http://sub-labo.com/schemas/article.json',
    type: 'object',
    required: ['title', 'slug'],
    properties: {
      id: {type: 'integer'},
      title: {type: 'string'},
      summary: {type: 'string', default: '', maxLength: 300},
      slug: {type: 'string'},
      isPublished: {type: 'boolean', default: false},
      content: {type: 'string', default: ''}
    }
  }

  /* mat Custom methods [start] */
  static namedFilters = {
    default: (builder) => builder
      .applyFilter('last30'),

    last30: (builder) => builder
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .where('isPublished', true)
      .limit(30),

    draft: (builder) => builder
      .orderBy('created_at', 'desc')
      .orderBy('id', 'desc')
      .where('isPublished', false)
  }
  /* mat Custom methods [end] */
}
