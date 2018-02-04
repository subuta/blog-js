import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Articletag.jsonSchema)
  // then define relationMappings.
  Articletag.relationMappings = {
    tag: {
      modelClass: models.Tag,
      relation: Model.BelongsToOneRelation,
      join: {from: 'article_tag.tagId', to: 'tags.id'}
    },
    article: {
      modelClass: models.Article,
      relation: Model.BelongsToOneRelation,
      join: {from: 'article_tag.articleId', to: 'articles.id'}
    }
  }
}

export default class Articletag extends Model {
  static tableName = 'articles_tags'

  static jsonSchema = {
    title: 'ArticlesTag',
    $id: 'http://sub-labo.com/schemas/articles_tag.json',
    type: 'object',
    required: ['articleId', 'tagId'],
    properties: {
      id: {type: 'integer'},
      articleId: {type: 'integer'},
      tagId: {type: 'integer'},
      tag: {oneOf: [{type: 'null'}, {$ref: 'tag.json'}]},
      article: {oneOf: [{type: 'null'}, {$ref: 'article.json'}]}
    }
  }
}
