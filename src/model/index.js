import _ from 'lodash'

import Channel from './Channel'
import Comment from './Comment'
import User from './User'
import Attachment from './Attachment'

export {
  Channel,
  Comment,
  User,
  Attachment
}

const models = {
  Channel,
  Comment,
  User,
  Attachment
}

// call register to define association
_.each(models, (model) => model.register && model.register(models))

export default models
