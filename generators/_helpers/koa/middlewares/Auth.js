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
        ['koa-jwt', 'jwt'],
        ['jwks-rsa', 'jwksRsa'],
        ['src/utils/env', 'env']
      ]} />

      <Export>
        <Const name="getCurrentUser" leadingComments={['// add getCurrentUser method.']}>
          <ArrowFn>
            <identifier>ctx</identifier>
            <identifier>next</identifier>
            <blockStatement>
              <Const>
                <Declarator>
                  <objectPattern>
                    <property kind="init" shorthand={true}>
                      <identifier>User</identifier>
                      <identifier>User</identifier>
                    </property>
                  </objectPattern>
                  <Value identifier="ctx.state.models" />
                </Declarator>
              </Const>
              <assignmentExpression operator="=" es>
                <Value identifier="ctx.state.getCurrentUser" />
                <ArrowFn>
                  <FnCall callee="findFirst">
                    <FnCall callee="User.query" />
                    <Value>
                      {{auth0Id: <Value identifier="ctx.state.user.sub" />}}
                    </Value>
                  </FnCall>
                </ArrowFn>
              </assignmentExpression>
              <returnStatement>
                <FnCall callee="next" />
              </returnStatement>
            </blockStatement>
          </ArrowFn>
        </Const>
      </Export>

      <Let name="jwksUri">
        <templateLiteral>
          <templateElement tail={false}>
            {{raw: 'https://', cooked: 'https://'}}
          </templateElement>
          <templateElement tail={true}>
            {{raw: '/.well-known/jwks.json', cooked: '/.well-known/jwks.json'}}
          </templateElement>
          <Value identifier="env.AUTH0_API_IDENTIFIER" />
        </templateLiteral>
      </Let>

      <Let name="opts" leadingComments={['// Validate the audience and the issuer.']}>
        <Value>
          {{
            audience: <Value identifier="env.AUTH0_AUDIENCE" />,
            issuer: (
              <templateLiteral>
                <templateElement tail={false}>
                  {{raw: 'https://', cooked: 'https://'}}
                </templateElement>
                <templateElement tail={true}>
                  {{raw: '/', cooked: '/'}}
                </templateElement>
                <Value identifier="env.AUTH0_API_IDENTIFIER" />
              </templateLiteral>
            )
          }}
        </Value>
      </Let>

      <ifStatement alternate={null}>
        <binaryExpression operator="===">
          <Value identifier="env.NODE_ENV" />
          <Value>test</Value>
        </binaryExpression>
        <blockStatement>
          <assignmentExpression operator="=" es>
            <identifier>jwksUri</identifier>
            <Value>http://localhost/.well-known/jwks.json</Value>
          </assignmentExpression>
          <assignmentExpression operator="=" es>
            <identifier>opts</identifier>
            <Value>{{debug: 'true'}}</Value>
          </assignmentExpression>
        </blockStatement>
      </ifStatement>

      <Export leadingComments={[
        '// https://auth0.com/docs/quickstart/backend/nodejs',
        '// Middleware below this line is only reached if JWT token is valid'
      ]} default>
        <FnCall callee="jwt">
          <objectExpression>
            <property kind="init">
              <identifier>secret</identifier>
              <FnCall callee="jwksRsa.koaJwtSecret">
                <Value>
                  {{
                    cache: true,
                    rateLimit: true,
                    jwksRequestsPerMinute: 5,
                    jwksUri: <Value identifier="jwksUri" />
                  }}
                </Value>
              </FnCall>
            </property>
            <property kind="init">
              <identifier>algorithms</identifier>
              <Value raw>{['RS256']}</Value>
            </property>
            <spreadProperty>
              <identifier>opts</identifier>
            </spreadProperty>
          </objectExpression>
        </FnCall>
      </Export>
    </fragment>
  )
}
