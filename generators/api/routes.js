/** @jsx h */

import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import generator from '@subuta/snippets/lib/koa/routes'
import UserRoute from '@subuta/snippets/lib/koa/UserRoute'

const routes = {
  channel: {
    except: [
      'update',
      'delete'
    ],
    eager: '[comments.[attachment, commentedBy]]'
  },
  comment: {
    except: [
      'update',
      'show'
    ],
    eager: '[attachment, commentedBy]'
  },
  attachment: {
    imports: [
      ['uuid/v4', 'uuid'],
      ['path', 'path'],
      ['src/utils/s3', null, [
        'getSignedUrl'
      ]],
    ],
    only: [
      'create'
    ],
    eager: ''
  },
  user: {
    render: UserRoute,
    eager: ''
  }
}

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  return Promise.map(_.toPairs(routes), async ([model, config]) => {
    const models = _.upperFirst(pluralize(model))

    // if generator passed then use that.
    if (config.render) {
      return fs.writeFile(`${filePath}/${models}.js`, format(config.render({model, config})))
    }

    // render by `routes` generator otherwise.
    const data = build`
      ${generator({model, config})}
    `

    return fs.writeFile(`${filePath}/${models}.js`, format(data))
  })
}
