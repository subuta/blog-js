import { build, format, snippets as s } from 'bld.js'

import env from '@subuta/snippets/lib/_utils/env'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const vars = [
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'S3_BUCKET',
    'DATABASE_URL',
    'NODE_ENV',
    'AUTH0_API_IDENTIFIER',
    'AUTH0_AUDIENCE'
  ]

  const data = build`
    ${env(vars)}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
