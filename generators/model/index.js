import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Entrypoint from '@subuta/snippets/objection/Entrypoint'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Entrypoint({modelDir: 'src/model'})}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
