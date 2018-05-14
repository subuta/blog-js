import React from 'react'
import _ from 'lodash'

import {
  compose,
  withPropsOnChange,
  withHandlers,
  lifecycle
} from 'recompose'

import { sanitizeHtml, upgradeDom } from 'src/views/utils/markdown'

import withStyles from './style'

const isBrowser = typeof window !== 'undefined'

let embedlyRenderedListener = []
let embedlyResizeListener = []

if (isBrowser) {
  // load embedly
  import('src/views/utils/embedly').then(({oembed, initialize}) => {
    initialize(window, document).then((embedly) => {
      embedly('on', 'card.rendered', (node) => {
        _.each(embedlyRenderedListener, (fn) => fn())
      })
      embedly('on', 'card.resize', (node) => {
        _.each(embedlyResizeListener, (fn) => fn())
      })

      upgradeDom('hoge')
    })
  })
}

const enhance = compose(
  withStyles,
  withHandlers(() => {
    let nodeRef

    return {
      setNodeRef: () => (ref) => {
        nodeRef = ref
      },

      getNodeRef: () => () => nodeRef
    }
  }),
  lifecycle({
    componentWillMount () {
      embedlyRenderedListener.push(this.props.onLoad)
      embedlyResizeListener.push(this.props.onResized)
    },

    componentDidMount () {
      upgradeDom(this.props.getNodeRef())
    },

    componentWillUnmount () {
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
    className,
    setNodeRef
  } = props

  let markdownContentClass = styles.MarkdownContent
  if (className) {
    markdownContentClass += ` ${className}`
  }

  return (
    <div
      className={markdownContentClass}
      dangerouslySetInnerHTML={{__html: html}}
      ref={setNodeRef}
    />
  )
})
