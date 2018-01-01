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
        ['koa', 'Koa'],
        ['../config', null, [
          'PUBLIC_DIR'
        ]],
        ['./api', 'api'],
        ['@koa/cors', 'cors'],
        ['koa-logger', 'logger'],
        ['koa-static', 'serve'],
      ]} />

      <Const name="app">
        <newExpression>
          <identifier>Koa</identifier>
        </newExpression>
      </Const>
      <Const name="PORT">
        <logicalExpression operator="||">
          <Value identifier="process.env.PORT" />
          <Value>{3000}</Value>
        </logicalExpression>
      </Const>

      <FnCall
        callee="app.use"
        leadingComments={['// log requests']}
        es
      >
        <FnCall callee="logger" />
      </FnCall>
      <FnCall callee="app.use" leadingComments={['// cors']} es>
        <FnCall callee="cors" />
      </FnCall>

      <FnCall callee="app.use" leadingComments={['// handle /api requests']} es>
        <FnCall callee="api.routes" />
      </FnCall>
      <FnCall callee="app.use" es>
        <FnCall callee="api.allowedMethods" />
      </FnCall>
      <FnCall callee="app.use" leadingComments={['// otherwise PUBLIC_DIR']} es>
        <FnCall callee="serve">
          <identifier>PUBLIC_DIR</identifier>
        </FnCall>
      </FnCall>

      <ifStatement alternate={null}>
        <unaryExpression operator="!" prefix={true}>
          <Value identifier="module.parent" />
        </unaryExpression>
        <blockStatement>
          <FnCall callee="app.listen" es>
            <identifier>PORT</identifier>
          </FnCall>
        </blockStatement>
      </ifStatement>
      <Export default>
        <identifier>app</identifier>
      </Export>
    </fragment>
  )
}
