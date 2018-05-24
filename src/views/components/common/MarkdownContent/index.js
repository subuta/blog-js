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
  withHandlers((props) => {
    let nodeRef
    let onLoad = _.noop

    // Wait for img onLoad.
    // https://stackoverflow.com/questions/5933230/javascript-image-onload
    const waitForImgLoad = ($el) => new Promise((resolve) => {
      if ($el.complete) return resolve()
      $el.addEventListener('load', resolve)
    })

    return {
      setNodeRef: () => (ref) => {
        if (!ref) return
        // if ref changed.
        if (nodeRef !== ref) {
          Promise.all(_.map(ref.querySelectorAll('img'), waitForImgLoad)).then(() => onLoad())
        }
        nodeRef = ref
      },

      getNodeRef: () => () => nodeRef,

      initialize: () => () => {
        onLoad = props.onLoad
      },

      destroy: () => () => {
        onLoad = _.noop
      }
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
        setIgnoredScripts
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
  ),
  lifecycle({
    componentWillMount () {
      this.props.initialize();
    },

    componentWillUnmount () {
      this.props.destroy();
    }
  })
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
