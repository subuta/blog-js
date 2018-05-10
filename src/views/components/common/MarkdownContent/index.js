import React from 'react'
import _ from 'lodash'

import {
  compose,
  withPropsOnChange,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'

import withStyles from './style'

const isBrowser = typeof window !== 'undefined'

let embedlyEventListener = []

if (isBrowser) {
  // FIXME: More performant way to manage embedly.
  // load embedly
  import('src/views/utils/embedly').then(({getEmbedly}) => {
    const embedly = getEmbedly()
    embedly('on', 'card.rendered', (node) => {
      _.each(embedlyEventListener, (fn) => fn())
    });
    embedly('on', 'card.resize', (node) => {
      _.each(embedlyEventListener, (fn) => fn())
    });
  })
}

const enhance = compose(
  withStyles,
  lifecycle({
    componentWillMount() {
      embedlyEventListener.push(this.props.onLoad)
    },

    componentWillUnmount() {
      embedlyEventListener = _.without(embedlyEventListener, this.props.onLoad)
    }
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
