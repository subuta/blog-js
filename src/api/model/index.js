require('babel-register')

import _ from 'lodash'
import requireGlob from 'require-glob'
import { Model } from 'objection'
import { absolutePath } from '../../../config'
import knex from 'src/api/utils/knex'

// assign connection to knex.
Model.knex(knex)

// then require all without itself.
const modules = {
  Article: require('./Article'),
  ArticleTag: require('./ArticleTag'),
  Attachment: require('./Attachment'),
  Channel: require('./Channel'),
  Comment: require('./Comment'),
  Tag: require('./Tag'),
  User: require('./User')
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
