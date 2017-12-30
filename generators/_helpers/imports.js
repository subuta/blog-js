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
      {_.map(modules, (source, name) => <Import name={name} source={source} default />)}
    </fragment>
  )
}
