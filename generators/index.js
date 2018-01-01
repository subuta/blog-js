/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import Entrypoint from 'generators/_helpers/koa/Entrypoint'

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

import Imports from 'generators/_helpers/js/imports'

export default async (ctx) => {
  const {filePath, fileName, fs} = ctx

  const render = () => {
    return (
      <program>
        <Entrypoint />
      </program>
    )
  }

  const data = format(print(render()))
  return fs.writeFile(`${filePath}/${fileName}`, data)
}
