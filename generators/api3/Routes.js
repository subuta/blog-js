/** @jsx h */

import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import routes from '../_helpers/koa/routes'

const models = [
  'channel',
  'comment',
  'attachment'
]

const routeConfig = {
  channel: {
    except: [
      'update',
      'delete'
    ]
  },
  comment: {
    except: [
      'update',
      'show'
    ]
  },
  attachment: {
    only: [
      'create'
    ]
  }
}

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(models, async (model) => {
    const data = build`
      ${routes({model, routes: routeConfig[model]})}
    `

    const models = _.upperFirst(pluralize(model))

    return fs.writeFile(`${filePath}/${models}.js`, format(data))
  })
}
