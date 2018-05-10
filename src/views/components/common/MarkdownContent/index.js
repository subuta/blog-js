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

let embedlyRenderedListener = []
let embedlyResizeListener = []

if (isBrowser) {
  // FIXME: More performant way to manage embedly.
  // load embedly
  import('src/views/utils/embedly').then(({getEmbedly}) => {
    const embedly = getEmbedly()
    embedly('on', 'card.rendered', (node) => {
      _.each(embedlyRenderedListener, (fn) => fn())
    });
    embedly('on', 'card.resize', (node) => {
      _.each(embedlyResizeListener, (fn) => fn())
    });
  })
}

const enhance = compose(
  withStyles,
  lifecycle({
    componentWillMount() {
      embedlyRenderedListener.push(this.props.onLoad)
      embedlyResizeListener.push(this.props.onResized)
    },

    componentWillUnmount() {
      embedlyRenderedListener = _.without(embedlyRenderedListener, this.props.onLoad)
      embedlyResizeListener = _.without(embedlyResizeListener, this.props.onResized)
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
