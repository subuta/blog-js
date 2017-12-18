import _ from 'lodash'
import * as normalizr from 'normalizr'
import { fetchEntities } from 'src/modules'

const { schema } = normalizr

export const comment = new schema.Entity('comments')
export const commentList = new schema.Array(comment)

export const channel = new schema.Entity('channels')
export const channelList = new schema.Array(channel)

export const attachment = new schema.Entity('attachments')
export const attachmentList = new schema.Array(attachment)

export const user = new schema.Entity('users')
export const userList = new schema.Array(user)

channel.define({
  comments: [comment]
})

comment.define({
  channel,
  attachment,
  commentedBy: user
})

const models = {
  comment,
  commentList,
  channel,
  channelList,
  attachment,
  attachmentList,
  user,
  userList
}

// denormalize data using schema.
export const denormalize = (data, modelName, state) => {
  const schema = models[_.trimEnd(modelName, 's')]
  return normalizr.denormalize(data, schema, fetchEntities(state))
}

export default models
