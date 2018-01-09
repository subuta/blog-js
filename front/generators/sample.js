import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Action from '../../generators/_helpers/redux'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const data = build`
    console.log('hoge');
  `

  return fs.writeFile(`${filePath}/tmp/${fileName}`, format(data))
}
