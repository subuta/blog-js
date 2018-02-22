import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Request from '@subuta/snippets/lib/axios/request'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return fs.writeFile(`${filePath}/${fileName}`, format(Request()))
}
