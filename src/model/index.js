import _ from 'lodash'

import { loadCollection, initialize } from 'src/utils/waterline'

import Attachment from './Attachment'
import Channel from './Channel'
import Comment from './Comment'
import User from './User'

const models = {
  Attachment,
  Channel,
  Comment,
  User
}

_.each(models, (model) => loadCollection(model))

const load = async () => {
  const ontology = await initialize()
  return _.transform(ontology.collections, (models, model, key) => {
    // add capitalized keys as model
    models[_.capitalize(key)] = model
  }, ontology.collections)
}

export default load
