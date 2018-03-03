import { build, format, snippets as s } from 'bld.js'

import IndexTest from '@subuta/snippets/lib/koa/test'

import { Routes as RoutesConfig, Models as ModelsConfig } from '../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${IndexTest(RoutesConfig, ModelsConfig)}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
