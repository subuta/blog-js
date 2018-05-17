import React from 'react'
import _ from 'lodash'

import {
  compose,
  withPropsOnChange,
  withHandlers,
  withState,
  lifecycle
} from 'recompose'

import { sanitizeHtml } from 'src/views/utils/markdown'
import { findOrInsertScriptNode } from 'src/views/utils/node'

import withStyles from './style'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  withState('ignoredScripts', 'setIgnoredScripts', []),
  withHandlers(() => {
    let nodeRef

    return {
      setNodeRef: () => (ref) => {
        nodeRef = ref
      },

      getNodeRef: () => () => nodeRef
    }
  }),
  withHandlers({
    onScriptLoaded: () => (url) => {
      if (url === 'https://platform.twitter.com/widgets.js') {
        requestAnimationFrame(() => twttr.widgets.load())
      }
    }
  }),
  withPropsOnChange(
    ['html'],
    (props) => {
      const {
        onScriptLoaded,
        ignoreScripts,
        setIgnoredScripts,
      } = props

      const sanitized = sanitizeHtml(props.html)

      // Insert scripts.
      if (!ignoreScripts) {
        setIgnoredScripts(sanitized.ignoredScripts)
        sanitized.ignoredScripts.forEach((url) => findOrInsertScriptNode(url, onScriptLoaded))
      }

      return {
        html: sanitized.html
      }
    }
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
