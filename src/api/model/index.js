import _ from 'lodash'
import {Model} from 'objection'
import knex from 'src/api/utils/knex'
import Attachment from './Attachment'
import Article from './Article'
import ArticleTag from './ArticleTag'
import Channel from './Channel'
import Comment from './Comment'
import Tag from './Tag'
import Reaction from './Reaction'
import User from './User'

// assign connection to knex.
Model.knex(knex)

// then require all without itself.
const modules = {
  Attachment,
  Article,
  ArticleTag,
  Channel,
  Comment,
  Tag,
  Reaction,
  User
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
