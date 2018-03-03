import _ from 'lodash'
import {Model} from 'objection'
import knex from 'src/api/utils/knex'
import ModelDir from './ModelDir'

// assign connection to knex.
Model.knex(knex)

// then require all without itself.
const modules = {
  ModelDir
}

// pick class definition from modules.
const models = _.transform(
  modules,
  (result, module, key) => (result[key] = module.default || module),
  {}
)

// call register of each model.
_.each(modules, (fn) => fn.register(models))

export default models
