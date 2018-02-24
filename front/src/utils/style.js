import _ from 'lodash'
import prefixAll from 'inline-style-prefixer/static'
import {styled, FreeStyle} from 'react-free-style'
import {lifecycle} from 'recompose'

// Create a stylesheet instance.
const Style = FreeStyle.create()

// re-export FreeStyle.
export {Style}

export const forceApplyNewStyle = lifecycle({
  componentDidMount() {
    // FIXME: need to call force-update after registerStyle?
    this.forceUpdate()
  }
})

export default function createWithStyles(styles = {}, options = {}) {
  styles = _.transform(
    styles,
    (result, style, key) => (result[key] = prefixAll(style)),
    {}
  )

  if (!_.isEmpty(options.rules)) {
    options.rules = _.transform(
      options.rules,
      (result, rule) => result.push([rule[0], prefixAll(rule[1])]),
      []
    )
  }

  if (!_.isEmpty(options.css)) {
    options.css = _.transform(
      options.css,
      (result, style, key) => (result[key] = prefixAll(style)),
      {}
    )
  }

  return styled(styles, options)
}
