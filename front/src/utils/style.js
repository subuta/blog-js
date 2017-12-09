import _ from 'lodash'
import { wrap as _wrap, FreeStyle } from 'react-free-style'
import prefixAll from 'inline-style-prefixer/static'

const Style = FreeStyle.create()

export const registerStyles = (styles) => {
  return _.reduce(styles, (result, style, key) => {
    result[key] = Style.registerStyle(prefixAll(style))
    return result
  }, {})
}

export const registerRules = (styles) => {
  return _.each(styles, (style, key) => {
    Style.registerRule(key, prefixAll(style))
  })
}

export const wrap = (Component) => _wrap(Component, Style, true)

export default Style
