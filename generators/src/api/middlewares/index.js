import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Models from '@subuta/snippets/lib/koa/api/middlewares/Models'
import Auth from '@subuta/snippets/lib/koa/api/middlewares/Auth'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const Middlewares = {
    'models': Models,
    'auth': Auth
  }

  return Promise.map(_.toPairs(Middlewares), async ([fileName, Middleware]) => {
    return fs.writeFile(`${filePath}/${fileName}.js`, format(Middleware()))
  })
}
