import _ from 'lodash'
import {fetchEntities} from 'src/modules'
import * as normalizr from 'normalizr'

const {schema} = normalizr

export const attachment = new schema.Entity('attachments')
export const attachmentList = new schema.Array(attachment)

export const channel = new schema.Entity('channels')
export const channelList = new schema.Array(channel)

export const comment = new schema.Entity('comments')
export const commentList = new schema.Array(comment)

export const user = new schema.Entity('users')
export const userList = new schema.Array(user)

attachment.define({
  comments: [comment]
})

channel.define({
  comments: [comment]
})

comment.define({
  channel,
  commentedBy: user,
  attachment
})

user.define({
  commentedBy: [comment]
})

const models = [
  attachment,
  attachmentList,
  channel,
  channelList,
  comment,
  commentList,
  user,
  userList
]

// denormalize data using schema.
export const denormalize = (data, modelName, state) => {
  const schema = models[_.trimEnd(modelName, 's')]
  return normalizr.denormalize(data, schema, fetchEntities(state))
}

export default models
