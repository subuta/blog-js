import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Routes from '@subuta/snippets/lib/react/components/Routes'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Routes()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
