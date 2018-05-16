import React from 'react'
import _ from 'lodash'

import {
  compose,
  withPropsOnChange,
  withHandlers,
  lifecycle
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'

import withStyles from './style'

const isBrowser = typeof window !== 'undefined'

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
    },

    componentDidMount () {
    },

    componentWillUnmount () {
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
