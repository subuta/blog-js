import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import { Routes } from '../../../generators/_config'

import ModuleIndex from '@subuta/snippets/lib/redux/ModuleIndex'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return fs.writeFile(`${filePath}/${fileName}`, format(ModuleIndex(Routes)))
}
