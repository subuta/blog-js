import _ from 'lodash'

import Channel from './Channel'
import Comment from './Comment'
import User from './User'

export {
  Channel,
  Comment,
  User
}

const models = {
  Channel,
  Comment,
  User
}

// call register to define association
_.each(models, (model) => model.register && model.register(models))

export default models
