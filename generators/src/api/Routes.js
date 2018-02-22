/** @jsx h */

import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import Route from '@subuta/snippets/lib/koa/api/Route'
import UserRoute from '@subuta/snippets/lib/koa/api/UserRoute'
import { Routes } from '../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(Routes), async ([model, config]) => {
    const models = _.upperFirst(pluralize(model))

    // if user.
    if (model === 'user') {
      return fs.writeFile(`${filePath}/${model}.js`, format(UserRoute({model, config})))
    }

    // render by `routes` generator otherwise.
    const data = build`
      ${Route({model, config})}
    `

    return fs.writeFile(`${filePath}/${model}.js`, format(data))
  })
}
