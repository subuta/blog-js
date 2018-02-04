import _ from 'lodash'
import pluralize from 'pluralize'
import {fetchEntities} from 'src/modules'
import * as normalizr from 'normalizr'

const {schema} = normalizr

export const attachment = new schema.Entity('attachment')
export const attachmentList = new schema.Array(attachment)

export const article = new schema.Entity('article')
export const articleList = new schema.Array(article)

export const articlesTag = new schema.Entity('articlesTag')
export const articlesTagList = new schema.Array(articlesTag)

export const channel = new schema.Entity('channel')
export const channelList = new schema.Array(channel)

export const comment = new schema.Entity('comment')
export const commentList = new schema.Array(comment)

export const tag = new schema.Entity('tag')
export const tagList = new schema.Array(tag)

export const user = new schema.Entity('user')
export const userList = new schema.Array(user)

attachment.define({
  comment
})

article.define({
  tags: [tag]
})

articlesTag.define({
  tag,
  article
})

channel.define({
  comments: [comment]
})

comment.define({
  channel,
  commentedBy: user,
  attachment
})

tag.define({
  articles: [article]
})

user.define({
  comments: [comment]
})

const models = {
  attachment,
  attachmentList,
  article,
  articleList,
  articleTag,
  articleTagList,
  channel,
  channelList,
  comment,
  commentList,
  tag,
  tagList,
  user,
  userList
}

// denormalize data using schema.
export const denormalize = (data, modelName, state) => {
  const schema = models[pluralize.singular(modelName)]
  return normalizr.denormalize(data, schema, fetchEntities(state))
}

export default models
