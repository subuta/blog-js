import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Store from '@subuta/snippets/lib/redux/Store'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Store()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
