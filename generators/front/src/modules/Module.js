import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import { Routes, Models } from '../../../_config'

import Module from '@subuta/snippets/lib/redux/Module'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(Routes), async ([model, config]) => {
    return fs.writeFile(`${filePath}/${model}.js`, format(Module(config, Models[model])))
  })
}
