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
    <Const name="piyo">
      <ArrowFn>
        <blockStatement>
          <returnStatement>
            <Value>
              {{
                type: 'HOGA',
                payload: true
              }}
            </Value>
          </returnStatement>
        </blockStatement>
      </ArrowFn>
    </Const>
  )
}
