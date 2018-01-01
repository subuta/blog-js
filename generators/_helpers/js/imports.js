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

export default ({modules}) => {
  return (
    <fragment>
      {_.map(modules, (module) => {
        const [source, name, ...namedImports] = module
        if (!_.isEmpty(namedImports)) {
          return (
            <Import source={source}>
              {name ? (
                <importDefaultSpecifier>
                  <identifier>{name}</identifier>
                </importDefaultSpecifier>
              ) : undefined}
              <importSpecifier>
                {_.map(namedImports, (name) => {
                  let local = name
                  if (_.isArray(name)) {
                    local = name[1] || name
                    name = name[0]
                  }
                  return (
                    <fragment>
                      <identifier>{name}</identifier>
                      <identifier>{local}</identifier>
                    </fragment>
                  )
                })}
              </importSpecifier>
            </Import>
          )
        }

        return (
          <Import name={name} source={source} default />
        )
      })}
    </fragment>
  )
}
