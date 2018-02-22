import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Route from '@subuta/snippets/lib/axios/api/Route'
import { Models, Routes } from '../../../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(Routes), async ([model, config]) => {
    return fs.writeFile(`${filePath}/${model}.js`, format(Route(config, Models[model])))
  })
}
