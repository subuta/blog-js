/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'

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

export default (props) => {
  return (
    <Const name="hoge">
      <ArrowFn>
        <blockStatement>
          <returnStatement>
            <Value>piyo</Value>
          </returnStatement>
        </blockStatement>
      </ArrowFn>
    </Const>
  )
}
