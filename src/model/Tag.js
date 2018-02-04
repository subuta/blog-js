import Model from './Model'
import {setSchema} from 'src/utils/ajvValidator'

export const register = (models) => {
  // setSchema to ajv.
  setSchema(Tag.jsonSchema)
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

export default class Tag extends Model {
  static tableName = 'tags'

  static jsonSchema = {
    title: 'Tag',
    $id: 'http://sub-labo.com/schemas/tag.json',
    type: 'object',
    required: ['label'],
    properties: {
      id: {type: 'integer'},
      label: {type: 'string'},
      articles: {type: ['array', 'null'], items: [{$ref: 'article.json'}]}
    }
  }
}
