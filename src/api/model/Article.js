import Model from './Model'
import _ from 'lodash'

/* mat Custom imports [start] */
import { toHtml } from 'src/views/utils/markdown'
/* mat Custom imports [end] */

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
      title: {type: 'string', minLength: 1, maxLength: 255},
      summary: {type: 'string', default: '', maxLength: 300},
      slug: {type: 'string', minLength: 1, maxLength: 255},
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

  $afterGet = async (queryContext) => {
    // default to blank.
    this.$html = ''
    if (this.content) {
      this.$html = await toHtml(this.content)
    }
  }

  $parseJson(json, opt) {
    // Remember to call the super class's implementation.
    json = super.$parseJson(json, opt);
    // Ignore html prop
    delete json.html
    // Do your conversion here.
    return json;
  }

  $formatJson(json) {
    // Remember to call the super class's implementation.
    json = super.$formatJson(json);
    // Append $html to json.
    json.html = this.$html
    return json;
  }
  /* mat Custom methods [end] */
}
