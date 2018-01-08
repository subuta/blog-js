import { build, format, snippets as s } from 'bld.js'
import knex from '../../../src/utils/knex'

export default (props = {}) => {
  const {
    modelDir = 'src/model'
  } = props

  const imports = s.import([
    ['lodash', '_'],
    ['require-glob', 'requireGlob'],
    ['objection', null, [
      'Model'
    ]],
    ['../../config', null, [
      'absolutePath'
    ]],
    ['src/utils/knex', 'knex'],
  ])

  return build`
    require('babel-register')
  
    ${imports}
    
    // assign connection to knex.
    Model.knex(knex)
    
    // then require all without itself.
    const modules = requireGlob.sync([
      absolutePath('${modelDir}/*.js'),
      \`!\$\{absolutePath('${modelDir}/index.js')\}\`,
      \`!\$\{absolutePath('${modelDir}/Model.js')\}\`
    ])
    
    // pick class definition from modules.
    const models = _.transform(modules, (result, module, key) => result[key] = module.default || module, {})
    
    // call register of each model.
    _.each(modules, (fn) => fn.register(models))
    
    ${s.export(build`
      models
    `)}
  `
}
