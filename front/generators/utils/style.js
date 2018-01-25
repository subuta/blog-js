import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import FreeStyle from '@subuta/snippets/lib/free-style'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return fs.writeFile(`${filePath}/${fileName}`, format(FreeStyle()))
}
