import { build, format, snippets as s } from 'bld.js'
import Promise from 'bluebird'
import _ from 'lodash'

import Action from '@subuta/snippets/lib/redux/Action'
import createActionCreator from '@subuta/snippets/lib/redux/ActionCreator'
import { Def as ActionType } from '@subuta/snippets/lib/redux/ActionType'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const doPiyo = Action('doPiyo')

  const data = build`
    ${ActionType('doPiyo')}
    
    ${createActionCreator('doPiyo', {name: 'hoge'})}
  `

  return fs.writeFile(`${filePath}/${fileName}`, format(data))
}
