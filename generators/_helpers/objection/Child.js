import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default ({model, config}, children = []) => {
  // FIXME: schemaから `__$refType` など独自のdataを消しつつstringifyする。あとassociationのvalidationがうまく動くかチェックする。
  const {
    schema = {}
  } = config

  const Model = _.upperFirst(pluralize.singular(model))
  const models = pluralize(model)

  const imports = s.import([
    ['./Model', 'Model']
  ])

  let nextSchema = {
    ...schema,
    properties: _.transform(schema.properties, (props, value, key) => {
      console.log(key);
      props[key] = value
    }, {})
  }

  console.log(nextSchema);

  return build`
    ${imports}
    
    export const register = (models) => {
      ${Model}.relationMappings = {}
    }
    
    ${s.export(build`
      class ${Model} extends Model {
        static tableName = '${models}'
        
        static jsonSchema = ${JSON.stringify(nextSchema)}
      }
    `)}
  `
}
