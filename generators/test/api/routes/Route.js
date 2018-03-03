import { build, format, snippets as s } from 'bld.js'

import _ from 'lodash'
import Promise from 'bluebird'
import RouteTest from '@subuta/snippets/lib/koa/test/Route'
import UserRouteTest from '@subuta/snippets/lib/koa/test/UserRoute'

import { Routes as routesConfig, Models as modelsConfig } from '../../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(routesConfig), async ([model]) => {
    // if user.
    if (model === 'user') {
      return fs.writeFile(`${filePath}/${model}.test.js`, format(UserRouteTest({model, routesConfig, modelsConfig})))
    }

    const data = build`
      ${RouteTest({model, routesConfig, modelsConfig})}
    `

    return fs.writeFile(`${filePath}/${model}.test.js`, format(data))
  })
}
