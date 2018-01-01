/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import Route from 'generators/_helpers/koa/Route'

const {
  Const,
  Let,
  Var,
  Value,
  ArrowFn,
  FnStatement,
  FnCall,
  Fn,
  Declarator,
  Import,
  Export,
  JSX,
  ClassDef,
  Method
} = simple

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
    const render = () => {
      return (
        <program>
          <Route model={model} routes={routes[model]} />
        </program>
      )
    }

    const data = format(print(render()))
    const models = _.upperFirst(pluralize(model))

    return fs.writeFile(`${filePath}/${models}.js`, data)
  })
}
