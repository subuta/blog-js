import React from 'react'
import _ from 'lodash'

import {
  compose,
  withPropsOnChange,
  withProps,
  withHandlers
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'

import withStyles from './style'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  withProps(({onLoad = _.noop}) => {
    if (isBrowser) {
      // load embedly
      import('src/views/utils/embedly').then(({getEmbedly}) => {
        const embedly = getEmbedly()
        embedly('on', 'card.rendered', (node) => onLoad());
        embedly('on', 'card.resize', (node) => onLoad());
      })
    }
    return {}
  }),
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
