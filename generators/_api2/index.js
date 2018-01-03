/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import _ from 'lodash'
import pluralize from 'pluralize'

import Promise from 'bluebird'

import Imports from 'generators/_helpers/js/imports'

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

  const render = () => {
    return (
      <program>
        {/* import dependencies */}
        <Imports modules={[
          ['koa-router', 'Router'],
          ['lodash', '_'],
          ['koa-body', 'koaBody'],
          ['./middlewares/auth', 'auth', [
            'getCurrentUser'
          ]],
          ['./middlewares/models', 'models'],
          ['./Channels', 'Channels'],
          ['./Comments', 'Comments'],
          ['./Users', 'Users'],
          ['./Attachments', 'Attachments'],
        ]} />

        <Const name="api">
          <newExpression>
            <identifier>Router</identifier>
            <Value>{{prefix: '/api'}}</Value>
          </newExpression>
        </Const>

        <Const
          name="registerRouters"
          leadingComments={['// register routers to api.']}
        >
          <ArrowFn>
            <identifier>routers</identifier>
            <blockStatement>
              <FnCall callee="_.each" es>
                <identifier>routers</identifier>
                <ArrowFn>
                  <identifier>router</identifier>
                  <identifier>name</identifier>
                  <blockStatement>
                    <logicalExpression operator="&&" es>
                      <Value identifier="router.register" />
                      <FnCall callee="router.register">
                        <identifier>routers</identifier>
                      </FnCall>
                    </logicalExpression>
                    <FnCall callee="api.use" es>
                      <templateLiteral>
                        <templateElement tail={false}>
                          {{raw: '/', cooked: '/'}}
                        </templateElement>
                        <templateElement tail={true}>
                          {{raw: '', cooked: ''}}
                        </templateElement>
                        <FnCall callee="_.snakeCase">
                          <identifier>name</identifier>
                        </FnCall>
                      </templateLiteral>
                      <FnCall callee="router.routes" />
                    </FnCall>
                  </blockStatement>
                </ArrowFn>
              </FnCall>
            </blockStatement>
          </ArrowFn>
        </Const>

        <FnCall callee="api.use" leadingComments={[
          '// routers set before auth middleware will not be protected',
          '// parse body'
        ]} es>
          <FnCall callee="koaBody">
            <Value>{{multipart: true}}</Value>
          </FnCall>
        </FnCall>

        <FnCall callee="api.use" leadingComments={['// set jwt middleware']} es>
          <identifier>auth</identifier>
        </FnCall>

        <FnCall
          callee="api.use"
          leadingComments={['// inject Objection.js models middleware.']}
          es
        >
          <identifier>models</identifier>
        </FnCall>

        <FnCall
          callee="api.use"
          leadingComments={['// inject getCurrentUser to state for ease of use.']}
          es
        >
          <identifier>getCurrentUser</identifier>
        </FnCall>

        <FnCall
          callee="registerRouters"
          leadingComments={[
            '// routers set after auth middleware will be protected'
          ]}
          es
        >
          <Value>
            {{
              Channels: <Value identifier="Channels" />,
              Comments: <Value identifier="Comments" />,
              Attachments: <Value identifier="Attachments" />,
              Users: <Value identifier="Users" />
            }}
          </Value>
        </FnCall>

        <exportDefaultDeclaration>
          <identifier name="api" />
        </exportDefaultDeclaration>
      </program>
    )
  }

  const data = format(print(render()))
  return fs.writeFile(`${filePath}/${fileName}`, data)
}
