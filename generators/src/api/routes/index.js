/** @jsx h */

import { build, format, snippets as s } from 'bld.js'

import Api from '@subuta/snippets/lib/koa/api'

import { Routes as RoutesConfig } from '../../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = Api(RoutesConfig)

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
