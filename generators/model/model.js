import Ajv from 'ajv'
import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Model from '@subuta/snippets/lib/objection/Model'
import Child from '@subuta/snippets/lib/objection/Child'

import Promise from 'bluebird'

import { Models } from '../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const promise =  Promise.map(_.toPairs(Models), async ([model, config]) => {
    // ensure name
    const models = pluralize(model)
    model = pluralize.singular(model)
    const ModelName = _.upperFirst(model)

    // render by `routes` generator otherwise.
    const data = build`
      ${Child({model, config})}
    `

    return fs.writeFile(`${filePath}/${ModelName}.js`, format(data))
  })

  const modelTask = fs.writeFile(`${filePath}/Model.js`, format(Model()))

  return Promise.all([promise, modelTask])
}
