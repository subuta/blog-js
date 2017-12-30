/** @jsx h */

import { toBuilder, print, format, h, simple } from 'js-to-builder'
import _ from 'lodash'
import pluralize from 'pluralize'

import Imports from 'generators/_helpers/imports'

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

const RouteBase = ({model, children = [], path = '/', method = 'get'}) => {
  const Model = _.upperFirst(pluralize.singular(model))

  return (
    <FnCall callee={`${model}.${method}`} es>
      <Value>{path}</Value>
      <ArrowFn async>
        <identifier>ctx</identifier>
        <blockStatement>
          <Const>
            <Declarator>
              <objectPattern>
                <property kind="init" shorthand={true}>
                  <identifier>{Model}</identifier>
                  <identifier>{Model}</identifier>
                </property>
              </objectPattern>
              <memberExpression>
                <memberExpression>
                  <identifier>ctx</identifier>
                  <identifier>state</identifier>
                </memberExpression>
                <identifier>models</identifier>
              </memberExpression>
            </Declarator>
          </Const>
          {children}
        </blockStatement>
      </ArrowFn>
    </FnCall>
  )
}

const IndexRoute = (props) => {
  const {model} = props
  const Model = _.upperFirst(pluralize.singular(model))

  return (
    <RouteBase {...props} path="/">
      <assignmentExpression operator="=" es>
        <memberExpression>
          <identifier>ctx</identifier>
          <identifier>body</identifier>
        </memberExpression>
        <awaitExpression all={false}>
          <FnCall callee={`${Model}.query`} />
        </awaitExpression>
      </assignmentExpression>
    </RouteBase>
  )
}

const ShowRoute = (props) => {
  const {model} = props
  const Model = _.upperFirst(pluralize.singular(model))

  return (
    <RouteBase {...props} path="/:id">
      <assignmentExpression operator="=" es>
        <memberExpression>
          <identifier>ctx</identifier>
          <identifier>body</identifier>
        </memberExpression>
        <awaitExpression all={false}>
          <FnCall callee="findFirst">
            <FnCall callee="eager">
              <FnCall callee={`${Model}.query`} />
              <Value>{''}</Value>
            </FnCall>
            <objectExpression>
              <property kind="init">
                <identifier name="id" />
                <Value identifier="ctx.params.id" />
              </property>
            </objectExpression>
          </FnCall>
        </awaitExpression>
      </assignmentExpression>
    </RouteBase>
  )
}

const CreateRoute = (props) => {
  let {model} = props
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return (
    <RouteBase {...props} path="/" method="post">
      <Const>
        <Declarator>
          <objectPattern>
            <property kind="init" shorthand={true}>
              <identifier>{model}</identifier>
              <identifier>{model}</identifier>
            </property>
          </objectPattern>
          <memberExpression>
            <memberExpression>
              <identifier>ctx</identifier>
              <identifier>request</identifier>
            </memberExpression>
            <identifier>body</identifier>
          </memberExpression>
        </Declarator>
      </Const>

      <Let name="params" es>
        <Value>{{}}</Value>
      </Let>

      <assignmentExpression operator="=" es>
        <Value identifier="ctx.body" />
        <awaitExpression all={false}>
          <FnCall callee="eager">
            <FnCall callee="insert">
              <FnCall callee={`${Model}.query`} />
              <objectExpression>
                <spreadProperty>
                  <identifier>{model}</identifier>
                </spreadProperty>
                <spreadProperty>
                  <identifier>params</identifier>
                </spreadProperty>
              </objectExpression>
            </FnCall>
            <Value>{''}</Value>
          </FnCall>
        </awaitExpression>
      </assignmentExpression>
    </RouteBase>
  )
}

const UpdateRoute = (props) => {
  let {model} = props
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return (
    <RouteBase {...props} path="/:id" method="put">
      <Const>
        <Declarator>
          <objectPattern>
            <property kind="init" shorthand={true}>
              <identifier>{model}</identifier>
              <identifier>{model}</identifier>
            </property>
          </objectPattern>
          <memberExpression>
            <memberExpression>
              <identifier>ctx</identifier>
              <identifier>request</identifier>
            </memberExpression>
            <identifier>body</identifier>
          </memberExpression>
        </Declarator>
      </Const>

      <Let name="params" es>
        <objectExpression>
          <spreadProperty>
            <identifier>{model}</identifier>
          </spreadProperty>
        </objectExpression>
      </Let>

      <assignmentExpression operator="=" es>
        <Value identifier="ctx.body" />
        <awaitExpression>
          <FnCall callee="findOrCreate">
            <FnCall callee={`${Model}.query`} />
            <Value>
              {{
                where: <Value>{{
                  id: (
                    <FnCall callee="_.get">
                      <identifier>ctx</identifier>
                      <Value>params.id</Value>
                    </FnCall>
                  )
                }}</Value>,
                defaults: <Value identifier="params" />
              }}
            </Value>
          </FnCall>
        </awaitExpression>
      </assignmentExpression>
    </RouteBase>
  )
}

const DeleteRoute = (props) => {
  let {model} = props
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)

  return (
    <RouteBase {...props} path="/:id" method="delete">
      <awaitExpression es>
        <FnCall callee="where">
          <FnCall callee="delete">
            <FnCall callee={`${Model}.query`} />
          </FnCall>
          <Value>
            {{
              id: <Value identifier="ctx.params.id" />
            }}
          </Value>
        </FnCall>
      </awaitExpression>
      <assignmentExpression operator="=" es>
        <Value identifier="ctx.body" />
        <Value value={null} />
      </assignmentExpression>
    </RouteBase>
  )
}

const Routes = (props) => {
  const {
    model
  } = props

  const {
    only, // the routes will generated.
    except  // the routes will ignored.
  } = props.routes

  let routes = {
    'index': <IndexRoute model={model} />,
    'show': <ShowRoute model={model} />,
    'create': <CreateRoute model={model} />,
    'update': <UpdateRoute model={model} />,
    'delete': <DeleteRoute model={model} />
  }

  if (only) {
    routes = _.pick(routes, only)
  } else if (except) {
    routes = _.omit(routes, except)
  }

  return _.values(routes)
}

export default (props) => {
  let {
    model,
    routes
  } = props

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  return (
    <fragment>
      {/* import dependencies */}
      <Imports modules={{
        'Router': 'koa-router',
        '_': 'lodash'
      }} />

      {/* declare router instance */}
      <Const name={models}>
        <newExpression>
          <identifier>Router</identifier>
        </newExpression>
      </Const>

      {/* each actions */}
      <Routes {...props} />

      <Export default>
        <Value>
          {{
            routes: (
              <ArrowFn>
                <FnCall callee="_.cloneDeep">
                  <FnCall callee={`${models}.routes`} />
                </FnCall>
              </ArrowFn>
            ),
            register: (
              <ArrowFn>
                <identifier>routers</identifier>
                <blockStatement />
              </ArrowFn>
            )
          }}
        </Value>
      </Export>
    </fragment>
  )
}
