/** @jsx h */

import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import Route from 'generators/_helpers/koa/Route'

const models = [
  'channel',
  'comment',
  'attachment'
]

const routes = {
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
      ${Route({model, routes: routes[model]})}
    `

    const models = _.upperFirst(pluralize(model))

    return fs.writeFile(`${filePath}/${models}.js`, format(data))
  })
}
