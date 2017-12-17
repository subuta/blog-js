require('babel-register')

import _ from 'lodash'
import { Model } from 'objection'
import requireGlob from 'require-glob'

import { absolutePath } from '../../config'

import knex from 'src/utils/knex'

// assign connection to knex.
Model.knex(knex)

// then require all without itself.
const modules = requireGlob.sync([
  absolutePath('src/model/*.js'),
  `!${absolutePath('src/model/index.js')}`,
  `!${absolutePath('src/model/Model.js')}`
])

// pick class definition from modules.
const models = _.transform(modules, (result, module, key) => result[key] = module.default, {})

// call register of each model.
_.each(modules, (fn) => fn.register(models))

export default models
