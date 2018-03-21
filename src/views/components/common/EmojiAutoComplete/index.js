import React from 'react'
import { findDOMNode } from 'react-dom'

import { Picker } from 'emoji-mart'
import Popper from 'popper.js'

const isBrowser = typeof window !== 'undefined'

import withStyles from './style'

import {
  compose,
  withState,
  withHandlers,
  shouldUpdate,
  lifecycle
} from 'recompose'

import { SHEET_URL } from 'src/views/utils/markdown/emoji/transformer'

const enhance = compose(
  withStyles,
  withState('popperStyles', 'setPopperStyles', {}),
  shouldUpdate((props, nextProps) => {
    // return true if popperStyle changed.
    const isPopperStyleChanged = !_.isEqual(props.popperStyles, nextProps.popperStyles)
    const isReferenceNodeChanged = props.referenceNode !== nextProps.referenceNode
    const isShowChanged = props.isShow !== nextProps.isShow
    return isPopperStyleChanged || isReferenceNodeChanged || isShowChanged
  }),
  withHandlers(({setPopperStyles}) => {
    let pickerNode = null
    let popper = null
    let referenceNode = null

    // enable text change handler of referenceNode.
    let observer = isBrowser ? new MutationObserver((_mutations) => {
      popper.scheduleUpdate()
    }) : {}

    const initialize = (referenceNode) => {
      popper = new Popper(
        referenceNode,
        pickerNode,
        {
          placement: 'right-start-auto',
          removeOnDestroy: true,
          modifiers: {
            offset: {
              offset: '0, 16px'
            },

            preventOverflow: {
              escapeWithReference: true,
            },

            applyStyle: {enabled: false},

            applyReactStyle: {
              enabled: true,
              fn: (data) => setPopperStyles(data.styles),
              order: 900,
            }
          }
        }
      )
      // enable scroll/resize handler.
      popper.enableEventListeners()
    }

    return {
      setPickerRef: () => (ref) => {
        if (!ref) return
        pickerNode = findDOMNode(ref)
      },

      update: () => (_referenceNode) => {
        if (!_referenceNode) return
        if (!popper) return initialize(_referenceNode)

        // if node reference changed
        if (referenceNode !== _referenceNode) {
          observer.disconnect()

          // Update reference node after popper instantiated, means re-use popper instance always :)
          // SEE: https://github.com/FezVrasta/popper.js/issues/538
          popper.reference = _referenceNode
          popper.scheduleUpdate()

          observer.observe(_referenceNode, {
            childList: true,
            subtree: true,
            characterData: true
          })

          referenceNode = _referenceNode
        }
      },

      destroy: () => () => {
        popper.disableEventListeners()
        popper.destroy()
        observer.disconnect()

        popper = null
        observer = null
      }
    }
  }),
  lifecycle({
    componentDidUpdate () {
      const {referenceNode, update} = this.props
      update(referenceNode)
    },

    componentWillUnmount () {
      const {destroy} = this.props
      destroy()
    }
  })
)

export default enhance((props) => {
  let {
    styles,
    isShow,
    popperStyles,
    setPickerRef,
    onSelect
  } = props

  let emojiAutoCompleteClass = styles.EmojiAutoComplete
  if (isShow) {
    emojiAutoCompleteClass += ` is-show`
  }

  return (
    <div className={emojiAutoCompleteClass}>
      <Picker
        set='apple'
        ref={setPickerRef}
        emojiTooltip={true}
        onClick={onSelect}
        backgroundImageFn={() => SHEET_URL}
        style={popperStyles}
      />
    </div>
  )
})
