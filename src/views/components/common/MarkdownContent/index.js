import {
  compose,
  withPropsOnChange,
  withHandlers
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'

import withStyles from './style'

const enhance = compose(
  withStyles,
  withPropsOnChange(
    ['html'],
    ({html}) => ({html: sanitizeHtml(html)})
  )
)

export default enhance((props) => {
  const {html} = props
  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
})
