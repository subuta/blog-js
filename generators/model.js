import Ajv from 'ajv'
import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Model from './_helpers/objection/Model'
import Child from './_helpers/objection/Child'

import Promise from 'bluebird'

import Attachment from './_model/Attachment'
import Channel from './_model/Channel'
import Comment from './_model/Comment'
import User from './_model/User'

const ajv = new Ajv({
  schemas: [
    Comment,
    Channel
  ],
  removeAdditional: true,
  useDefaults: true
})

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
      return fs.writeFile(`${filePath}/model2/${Model}.js`, format(config.render({model, config})))
    }

    // render by `routes` generator otherwise.
    const data = build`
      ${Child({model, config})}
    `

    return fs.writeFile(`${filePath}/model2/${Model}.js`, format(data))
  })
}
