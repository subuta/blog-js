import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import MockedKoa from '@subuta/snippets/lib//_test-helpers/MockedKoa'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${MockedKoa()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
