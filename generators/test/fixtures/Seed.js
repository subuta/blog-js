import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import Promise from 'bluebird'

import Seed from '@subuta/snippets/lib/knex/seed'
import { Routes as routesConfig, Models as modelsConfig } from '../../_config'

export default async (ctx) => {
  const {filePath, fs} = ctx

  // make junction table created lately.
  const models = _.sortBy(_.toPairs(modelsConfig), ([_, config]) => config.isJunction || false)

  return Promise.map(models, async ([model], i) => {

    const data = build`
      ${Seed({model, routesConfig, modelsConfig})}
    `

    return fs.writeFile(`${filePath}/${s.format(i + 1, '000')}_${model}.js`, format(data))
  })
}
