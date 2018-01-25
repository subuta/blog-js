import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import { ActionTypeDef } from '@subuta/snippets/lib/redux/ActionType'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${ActionTypeDef('doPiyo')}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
