import * as normalizr from 'normalizr'
import { fetchEntities } from 'src/modules'

const { schema } = normalizr

export const comment = new schema.Entity('comments')
export const commentList = new schema.Array(comment)

export const channel = new schema.Entity('channels')
export const channelList = new schema.Array(channel)

channel.define({
  comments: [comment]
})

comment.define({
  channel
})

const models = {
  comment,
  commentList,
  channel,
  channelList
}

// denormalize data using schema.
export const denormalize = (data, modelName, state) => {
  const schema = models[_.trimEnd(modelName, 's')]
  return normalizr.denormalize(data, schema, fetchEntities(state))
}

export default models
