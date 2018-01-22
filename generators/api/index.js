/** @jsx h */

import { build, format, snippets as s } from 'bld.js'

import Api from '@subuta/snippets/lib/koa/api'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = Api()

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
