import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Schema from '@subuta/snippets/lib/normalizr/schema'
import { Models } from '../../../_config'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return fs.writeFile(`${filePath}/${fileName}`, format(Schema(Models)))
}
