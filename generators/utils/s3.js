import { build, format, snippets as s } from 'bld.js'

import s3 from '@subuta/snippets/lib/aws-sdk/s3'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    ${s3()}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
