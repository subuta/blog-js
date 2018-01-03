import { build, format, snippets as s } from 'bld.js'

import EntryPoint from 'generators/_helpers/koa/Entrypoint'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${EntryPoint()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
