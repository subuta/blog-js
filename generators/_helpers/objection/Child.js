import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'
import Model from '../../../src/model/Model'

export default ({model, config}, children = []) => {
  const {
    schema = {}
  } = config

  const Model = _.upperFirst(pluralize.singular(_.toLower(model)))

  const imports = s.import([
    ['./Model', 'Model'],
    ['src/utils/ajvValidator', null, [
      'setSchema'
    ]],
  ])

  const parseSchema = (schema) => {
    // Expects schema has following keys.
    // tableName = will transform to Model's tableName
    // required = will transform to Model's jsonSchema
    // properties = will transform to Model's jsonSchema
    // relations = will transform to Model's relationMappings
    let {
      tableName,
      required,
      properties,
      relations
    } = schema

    // ensure naming convention.
    const model = pluralize.singular(_.toLower(tableName))
    const models = pluralize(model)
    const Model = _.upperFirst(model)

    const parseRelation = (relation) => _.transform(relation, (results, value, key) => {
      // pass-through
      if (_.includes(['join'], key)) {
        return results[key] = s.stringify(value)
      }

      const relatedModel = pluralize.singular(_.toLower(value))
      const RelatedModel = _.upperFirst(relatedModel)

      results['modelClass'] = `models.${RelatedModel}`
      switch (key) {
        case 'belongsTo':
          results['relation'] = 'Model.BelongsToOneRelation'
          break
        case 'hasOne':
          results['relation'] = 'Model.HasOneRelation'
          break
        case 'hasMany':
          results['relation'] = 'Model.HasManyRelation'
          break
        case 'hasAndBelongsToMany':
          results['relation'] = 'Model.ManyToManyRelation'
          break
      }
    }, {})

    const relationMappings = _.transform(relations, (results, value, key) => {
      results[key] = parseRelation(value)
    }, {})

    properties = _.transform(relations, (results, value, key) => {
      results[key] = (() => {
        if (value.belongsTo) {
          const relatedModel = pluralize.singular(_.toLower(value.belongsTo))
          return {
            oneOf: [
              {'type': 'null'},
              {'$ref': `${relatedModel}.json`}
            ]
          }
        } else if (value.hasOne) {
          const relatedModel = pluralize.singular(_.toLower(value.hasOne))
          return {
            oneOf: [
              {'type': 'null'},
              {'$ref': `${relatedModel}.json`}
            ]
          }
        } else if (value.hasMany) {
          const relatedModel = pluralize.singular(_.toLower(value.hasMany))
          return {
            type: ['array', 'null'],
            items: [
              {'$ref': `${relatedModel}.json`},
            ]
          }
        } else if (value.hasAndBelongsToMany) {
          const relatedModel = pluralize.singular(_.toLower(value.hasAndBelongsToMany))
          return {
            type: ['array', 'null'],
            items: [
              {'$ref': `${relatedModel}.json`},
            ]
          }
        }
      })()
    }, properties)

    const jsonSchema = {
      title: s.stringify(Model),
      $id: s.stringify(`http://sub-labo.com/schemas/${model}.json`),
      type: s.stringify('object'),
      required: s.stringify(required),
      properties: s.stringify(properties)
    }

    return {
      tableName: models,
      relationMappings,
      jsonSchema
    }
  }

  let {
    tableName,
    relationMappings,
    jsonSchema
  } = parseSchema(schema)

  return build`
    ${imports}
    
   
    export const register = (models) => {
      // setSchema to ajv.
      setSchema(${Model}.jsonSchema)
      // then define relationMappings.
      ${Model}.relationMappings = ${s.raw(relationMappings)}
    }
    
    ${s.export(build`
      class ${Model} extends Model {
        static tableName = '${tableName}'
        
        static jsonSchema = ${s.raw(jsonSchema)}
      }
    `)}
  `
}
