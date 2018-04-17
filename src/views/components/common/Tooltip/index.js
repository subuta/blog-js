import React from 'react'
import createTippy from 'tippy.js'
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
    let tippy = null

    const destroy = () => {
      tippy && tippy.destroy()
      toolTipRef = null
      tippy = null
    }

    const initialize = (props) => {
      const {
        placement,
        offset,
        size,
        warn,
        error,
        shownOnInit,
        getTemplateRef
      } = props

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

      createTippy(toolTipRef, {
        theme,
        arrow,
        html: getTemplateRef(),
        placement: placement || 'top',
        offset: offset || 0,
        animation: 'fade',
        size: size || 'regular',
        dynamicTitle: true,
        duration: [200, 0],
        performance: true,
        arrowType: 'sharp',
        sticky: true,
        arrowTransform: 'scale(0.75) translateY(-1.5px)'
      })

      tippy = toolTipRef._tippy

      // for tutorial
      if (shownOnInit) {
        tippy.show(300)
        _.delay(() => tippy && tippy.hide(), 1000)
      }
    }

    return {
      setToolTipRef: (props) => (ref) => {
        if (!ref) return
        if (toolTipRef === ref) return
        if (toolTipRef) destroy()
        toolTipRef = ref
        initialize(props)
      },

      destroyTippy: () => destroy,

      scheduleUpdate: () => () => {
        if (!_.get(tippy, 'popperInstance')) return
        tippy.popperInstance.scheduleUpdate()
      },

      enableTippy: () => () => tippy.enable(),
      disableTippy: () => () => tippy.disable(),
    }
  }),
  lifecycle({
    componentWillUnmount () {
      this.props.destroyTippy()
    },

    componentDidUpdate () {
      this.props.scheduleUpdate()

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
      <span ref={setTemplateRef} className={styles.Template}>
        {warn && (
          <MdWarningIcon/>
        )}

        {error && (
          <MdErrorIcon/>
        )}

        <span>{title}</span>
      </span>

      <span>
        {children}
      </span>
    </span>
  )
})
