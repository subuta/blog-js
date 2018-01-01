/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import _ from 'lodash'

import Promise from 'bluebird'

import Models from 'generators/_helpers/koa/middlewares/Models'
import Auth from 'generators/_helpers/koa/middlewares/Auth'

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

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const Middlewares = {
    'models': Models,
    'auth': Auth
  }

  return Promise.map(_.toPairs(Middlewares), async ([fileName, Middleware]) => {
    const render = () => {
      return (
        <program>
          <Middleware />
        </program>
      )
    }

    const data = format(print(render()))
    return fs.writeFile(`${filePath}/${fileName}.js`, data)
  })
}
