import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import KnexFixtures from '@subuta/snippets/lib//_test-helpers/KnexFixtures'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${KnexFixtures()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
