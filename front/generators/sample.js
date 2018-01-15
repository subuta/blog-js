import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Action from '@subuta/snippets/lib/redux/Action'
import ActionType from '@subuta/snippets/lib/redux/ActionType'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Action()}
    ${ActionType('doHoge')}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
