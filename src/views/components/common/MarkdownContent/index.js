import {
  compose,
  withPropsOnChange,
  withHandlers
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'

import withStyles from './style'

import {
  PRIMARY_COLOR,
  ACCENT4_COLOR,
  TABLET_MEDIA_QUERY,
  BORDER_COLOR
} from 'src/views/constants/style'

const enhance = compose(
  withStyles,
  withPropsOnChange(
    ['html'],
    ({html}) => ({html: sanitizeHtml(html)})
  )
)

export default enhance((props) => {
  const {
    html,
    styles,
    className
  } = props

  let markdownContentClass = styles.MarkdownContent
  if (className) {
    markdownContentClass += ` ${className}`
  }

  return (
    <div
      className={markdownContentClass}
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
})
