/** @jsx h */

import { build, format, snippets as s } from 'bld.js'

import RouteIndex from '@subuta/snippets/lib/koa/routes'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = RouteIndex()

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
