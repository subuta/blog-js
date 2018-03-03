import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import { Models } from '../../../_config'
import Entrypoint from '@subuta/snippets/lib/objection/Entrypoint'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Entrypoint(Models)}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
