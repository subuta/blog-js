import _ from 'lodash'
import pluralize from 'pluralize'
import {fetchEntities} from 'src/views/modules'
import * as normalizr from 'normalizr'

const {schema} = normalizr

export const attachment = new schema.Entity('attachment')
export const attachmentList = new schema.Array(attachment)

export const article = new schema.Entity('article')
export const articleList = new schema.Array(article)

export const channel = new schema.Entity('channel')
export const channelList = new schema.Array(channel)

export const comment = new schema.Entity('comment')
export const commentList = new schema.Array(comment)

export const tag = new schema.Entity('tag')
export const tagList = new schema.Array(tag)

export const reaction = new schema.Entity('reaction')
export const reactionList = new schema.Array(reaction)

export const user = new schema.Entity('user')
export const userList = new schema.Array(user)

attachment.define({
  comment
})

article.define({
  tags: [tag],
  author: user,
  reactions: [reaction]
})

channel.define({
  comments: [comment]
})

comment.define({
  channel,
  commentedBy: user,
  attachment,
  reactions: [reaction]
})

tag.define({
  articles: [article]
})

reaction.define({
  reactedBy: user
})

user.define({
  comments: [comment]
})

const models = {
  attachment,
  attachmentList,
  article,
  articleList,
  channel,
  channelList,
  comment,
  commentList,
  tag,
  tagList,
  reaction,
  reactionList,
  user,
  userList
}

// denormalize data using schema.
export const denormalize = (data, modelName, state) => {
  const schema = models[pluralize.singular(modelName)]
  return normalizr.denormalize(data, schema, fetchEntities(state))
}

export default models
