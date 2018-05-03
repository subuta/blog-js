import React from 'react'

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
