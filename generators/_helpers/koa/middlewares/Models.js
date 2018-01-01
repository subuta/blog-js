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

import Imports from 'generators/_helpers/js/imports'

export default (props) => {
  return (
    <fragment>
      {/* import dependencies */}
      <Imports modules={[
        ['src/model', 'models']
      ]} />

      <Export default>
        <ArrowFn>
          <identifier>ctx</identifier>
          <identifier>next</identifier>
          <blockStatement>
            <assignmentExpression operator="=" leadingComments={['// expose Objection.js models to context.']} es>
              <Value identifier="ctx.state.models" />
              <identifier>models</identifier>
            </assignmentExpression>
            <returnStatement>
              <FnCall callee="next" />
            </returnStatement>
          </blockStatement>
        </ArrowFn>
      </Export>
    </fragment>
  )
}
