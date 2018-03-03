import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import CurrentUser from '@subuta/snippets/lib/_test-helpers/CurrentUser'

import { Routes as RoutesConfig, Models as ModelsConfig } from '../../../_config'
import { generateSeeds } from '@subuta/snippets/lib/_utils/generateSeed'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const userSeed = _.first(generateSeeds(ModelsConfig.user, ModelsConfig.user.seeds))

  const data = build`
    ${CurrentUser(userSeed.auth0Id)}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
