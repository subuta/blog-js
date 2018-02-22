/** @jsx h */

import { build, format, snippets as s } from 'bld.js'

import Api from '@subuta/snippets/lib/koa/api'

import { Models } from '../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = Api(Models)

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
