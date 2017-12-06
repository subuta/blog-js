/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import _ from 'lodash'

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

import Action from './_builders/Action'

export default (ctx) => {
  const { filePath, fileName, fs } = ctx

  const render = () => {
    return (
      <program>
        <FnCall callee="console.log" es>
          <Value>hoge</Value>
        </FnCall>

        <Action />
      </program>
    )
  }

  const data = format(print(render()))

  return fs.writeFile(`${filePath}/${fileName}`, data)
}