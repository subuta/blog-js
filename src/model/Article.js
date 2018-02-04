import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Article.jsonSchema)
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
      content: {type: 'string'},
      tags: {type: ['array', 'null'], items: [{$ref: 'tag.json'}]}
    }
  }
}
