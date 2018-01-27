import { build, format, snippets as s } from 'bld.js'

import ajvValidator from '@subuta/snippets/lib/objection/ajvValidator'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${ajvValidator()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
