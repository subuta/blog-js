import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import { Routes, Models } from '../../../_config'

import Module from '@subuta/snippets/lib/redux/Module'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(Models), async ([model, modelConfig]) => {
    // skip creating module for junction table.
    if (Models[model].isJunction) return
    return fs.writeFile(`${filePath}/${model}.js`, format(Module(Routes[model], modelConfig)))
  })
}
