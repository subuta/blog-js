import { build, format, snippets as s } from 'bld.js'

export default () => {
  const imports = s.import([
    ['lodash', '_'],
    ['objection', null, [
      'Model'
    ]],
    ['src/utils/ajvValidator', 'ajvValidator']
  ])

  return build`
    ${imports}
    
    // Based on https://github.com/Vincit/objection.js/blob/master/examples/plugin/index.js
    // Base Model class
    
    class CustomQueryBuilder extends Model.QueryBuilder {
      async findFirst (params) {
        return _.first(await this.where(params))
      }
    
      async findOrCreate (params) {
        const {where, defaults} = params
        const found = await this.findFirst(where)
        if (found) return found
        return await this.insert(defaults)
      }
    }
    
    ${s.export(build`
      class extends Model {
        static QueryBuilder = CustomQueryBuilder
        
        static createValidator () {
          // https://github.com/Vincit/objection.js/issues/549
          // NOTE: createValidator() is inherited in all models extending \`BaseModel\`
          // and returns the same instance of \`validator\`
          return ajvValidator
        }
        
        $beforeInsert() {
          this.created_at = new Date().toISOString();
        }
      
        $beforeUpdate() {
          this.updated_at = new Date().toISOString();
        }
      }
    `)}
  `
}
