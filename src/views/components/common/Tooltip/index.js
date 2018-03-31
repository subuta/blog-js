import React from 'react'
import tippy from 'tippy.js'
import _ from 'lodash'

import MdWarningIcon from 'react-icons/lib/md/warning'
import MdErrorIcon from 'react-icons/lib/md/error'

import {
  compose,
  setDisplayName,
  withHandlers,
  lifecycle
} from 'recompose'

import withStyles from './style'

const enhance = compose(
  withStyles,
  setDisplayName('Tooltip'),
  withHandlers(() => {
    let templateRef = null

    return {
      setTemplateRef: () => (ref) => {
        templateRef = ref
      },

      getTemplateRef: () => () => templateRef
    }
  }),
  withHandlers(() => {
    let toolTipRef = null

    return {
      setToolTipRef: (props) => (ref) => {
        if (!ref) return
        const {
          placement,
          offset,
          size,
          warn,
          error,
          shownOnInit,
          getTemplateRef
        } = props

        toolTipRef = ref

        let arrow = true

        let theme = ''
        if (warn) {
          theme = 'warning'
          arrow = false
        }

        if (error) {
          theme = 'error'
          arrow = false
        }

        tippy(toolTipRef, {
          theme,
          arrow,
          html: getTemplateRef(),
          placement: placement || 'top',
          offset: offset || 0,
          animation: 'fade',
          size: size || 'regular',
          dynamicTitle: true,
          duration: [200, 100],
          performance: true,
          arrowType: 'sharp',
          arrowTransform: 'scale(0.75) translateY(-1.5px)'
        })

        // for tutorial
        if (shownOnInit) {
          toolTipRef._tippy.show(300)
          _.delay(() => toolTipRef && toolTipRef._tippy.hide(), 1000)
        }
      },

      destroyTippy: () => () => {
        toolTipRef._tippy.destroy()
        toolTipRef = null
      },

      enableTippy: () => () => toolTipRef._tippy.enable(),
      disableTippy: () => () => toolTipRef._tippy.disable(),
    }
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.destroyTippy()
    },

    componentDidUpdate () {
      if (this.props.disabled === undefined) return

      if (this.props.disabled) {
        this.props.disableTippy()
      } else {
        this.props.enableTippy()
      }
    }
  })
)

/** Tooltip component description */
export default enhance((props) => {
  const {
    styles,
    className,
    style,
    children,
    setToolTipRef,
    setTemplateRef,
    warn,
    error
  } = props

  let title = props.title || ''

  let tooltipClass = styles.Tooltip
  if (className) {
    tooltipClass += ` ${className}`
  }

  if (warn) {
    title = warn
  }

  if (error) {
    title = error
  }

  return (
    <span
      className={tooltipClass}
      style={style}
      title={title}
      ref={setToolTipRef}
    >
      {children}
      <span ref={setTemplateRef} className={styles.Template}>
        {warn && (
          <MdWarningIcon/>
        )}
        {error && (
          <MdErrorIcon/>
        )}
        <span>{title}</span>
      </span>
    </span>
  )
})
