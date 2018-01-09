import Ajv from 'ajv'
import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Model from '@subuta/snippets/objection/Model'
import Child from '@subuta/snippets/objection/Child'

import Promise from 'bluebird'

import Attachment from './_defs/Attachment'
import Channel from './_defs/Channel'
import Comment from './_defs/Comment'
import User from './_defs/User'

const models = {
  attachment: {
    schema: Attachment
  },
  channel: {
    schema: Channel
  },
  comment: {
    schema: Comment
  },
  user: {
    schema: User
  },
  Model: {
    render: Model
  }
}

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(models), async ([model, config]) => {
    // ensure name
    const models = pluralize(model)
    model = pluralize.singular(model)
    const Model = _.upperFirst(model)

    // if generator passed then use that.
    if (config.render) {
      return fs.writeFile(`${filePath}/${Model}.js`, format(config.render({model, config})))
    }

    // render by `routes` generator otherwise.
    const data = build`
      ${Child({model, config})}
    `

    return fs.writeFile(`${filePath}/${Model}.js`, format(data))
  })
}
