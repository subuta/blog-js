import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import ApiIndex from '@subuta/snippets/lib/axios/api'
import { Routes } from '../../../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return fs.writeFile(`${filePath}/${fileName}`, format(ApiIndex(Routes)))
}
