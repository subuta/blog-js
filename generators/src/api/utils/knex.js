import { build, format, snippets as s } from 'bld.js'

import Entrypoint from '@subuta/snippets/lib/knex/Entrypoint'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${Entrypoint()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
