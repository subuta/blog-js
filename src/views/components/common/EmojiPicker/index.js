import React from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import _ from 'lodash'
import keycode from 'keycode'

import { Picker } from 'emoji-mart'
import Popper from 'popper.js'

const isBrowser = typeof window !== 'undefined'
const PORTAL_CLASS = '__EMOJI-PICKER__'

import withStyles from './style'

import {
  compose,
  withState,
  withHandlers,
  shouldUpdate,
  lifecycle,
  branch,
  renderComponent
} from 'recompose'

import { SHEET_URL } from 'src/views/utils/markdown/emoji/transformer'

import {
  bindOnClosestInput,
  appendPortalNode,
  removePortalNode
} from 'src/views/utils/node'

const enhance = compose(
  withStyles,
  withState('popperStyles', 'setPopperStyles', {}),
  withState('isMounted', 'setIsMounted', false),
  shouldUpdate((props, nextProps) => {
    // return true if popperStyle changed.
    const isPopperStyleChanged = !_.isEqual(props.popperStyles, nextProps.popperStyles)
    const isReferenceNodeChanged = props.referenceNode !== nextProps.referenceNode
    const isShowChanged = props.isShow !== nextProps.isShow
    const isMountedChanged = props.isMounted !== nextProps.isMounted
    return isPopperStyleChanged || isReferenceNodeChanged || isShowChanged || isMountedChanged
  }),
  withHandlers({
    onClickEmoji: ({onSelect, onClose = _.noop}) => (emoji, e) => {
      onSelect(emoji.colons, e)
      onClose()
    }
  }),
  withHandlers(({setPopperStyles, setIsShow}) => {
    let pickerNode = null
    let popper = null
    let referenceNode = null
    let portal = appendPortalNode(PORTAL_CLASS)

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

            flip: {
              behavior: ['right', 'bottom', 'right']
            },

            preventOverflow: {
              boundariesElement: 'window'
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

      update: ({ isShow }) => (_referenceNode) => {
        if (!_referenceNode) return
        if (!popper) return initialize(_referenceNode)

        // ignore changes while element is invisible
        if (!isShow) return

        // if node reference changed
        if (referenceNode !== _referenceNode) {
          observer.disconnect()

          // Update reference node after popper instantiated, means re-use popper instance always :)
          // SEE: https://github.com/FezVrasta/popper.js/issues/538
          popper.reference = _referenceNode
          popper.popper = pickerNode

          observer.observe(_referenceNode, {
            childList: true,
            subtree: true,
            characterData: true
          })

          referenceNode = _referenceNode
        }

        popper.scheduleUpdate()
      },

      getPortal: () => () => portal,

      destroy: () => () => {
        popper && popper.disableEventListeners()
        popper && popper.destroy()
        observer.disconnect()

        portal = null
        popper = null
        observer = null
      }
    }
  }),
  lifecycle({
    componentDidMount () {
      const {setIsMounted} = this.props
      setIsMounted(true)
    },

    componentDidUpdate () {
      const {referenceNode, update} = this.props
      update(referenceNode)
    },

    componentWillUnmount () {
      const {destroy} = this.props
      destroy()
    }
  }),
  // Workaround for Universal rendering error.
  // Delay component rendering after componentDidMount.
  branch(
    ({isMounted}) => !isMounted,
    renderComponent(() => <div />),
    _.identity
  )
)

export default enhance((props) => {
  let {
    styles,
    isShow,
    isMounted,
    popperStyles,
    setPickerRef,
    onClickEmoji,
    getPortal,
    onClose = _.noop
  } = props

  let pickerWrapperClass = styles.PickerWrapper
  if (isShow) {
    pickerWrapperClass += ` is-show`
  }

  let backdropClass = styles.Backdrop
  if (isShow) {
    backdropClass += ` is-show`
  }

  const component = (
    <div className={styles.PickerRoot}>
      <div className={pickerWrapperClass}>
        <Picker
          set='apple'
          ref={setPickerRef}
          emojiTooltip={true}
          onClick={onClickEmoji}
          backgroundImageFn={() => SHEET_URL}
          style={popperStyles}
        />
      </div>

      <div
        className={backdropClass}
        onClick={onClose}
      />
    </div>
  )

  return isBrowser && getPortal() ? createPortal(
    component,
    getPortal()
  ) : component
})
