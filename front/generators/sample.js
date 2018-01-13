import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Action from '@subuta/snippets/redux/Action'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Action()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
