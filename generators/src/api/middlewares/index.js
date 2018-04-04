import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import models from '@subuta/snippets/lib/koa/api/middlewares/models'
import auth from '@subuta/snippets/lib/koa/api/middlewares/auth'
import withZone from '@subuta/snippets/lib/koa/api/middlewares/zone'
import validateResponse from '@subuta/snippets/lib/koa/api/middlewares/validateResponse'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const Middlewares = {
    models,
    auth,
    withZone,
    validateResponse,
  }

  return Promise.map(_.toPairs(Middlewares), async ([fileName, Middleware]) => {
    return fs.writeFile(`${filePath}/${fileName}.js`, format(Middleware()))
  })
}
