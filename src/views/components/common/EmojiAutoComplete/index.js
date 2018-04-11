import React from 'react'
import { findDOMNode, createPortal } from 'react-dom'
import _ from 'lodash'
import keycode from 'keycode'

import { emojiIndex, Emoji } from 'emoji-mart'

import Popper from 'popper.js'

const isBrowser = typeof window !== 'undefined'
const PORTAL_CLASS = '__EMOJI-AUTO-COMPLETE__'

import withStyles from './style'

import {
  compose,
  withState,
  withHandlers,
  shouldUpdate,
  lifecycle,
  withPropsOnChange
} from 'recompose'

import { SHEET_URL } from 'src/views/utils/markdown/emoji/transformer'

import {
  bindOnClosestInput,
  appendPortalNode,
  removePortalNode
} from 'src/views/utils/node'

const enhance = compose(
  withStyles,
  withState('cursor', 'setCursor', 0),
  withState('isForcedHide', 'setIsForcedHide', false),
  withState('popperStyles', 'setPopperStyles', {}),
  withPropsOnChange(
    ['value'],
    (props) => {
      const {value, setCursor, setIsForcedHide} = props

      // initialize state on value change.
      setCursor(0)
      setIsForcedHide(false)

      return {
        isShow: value.length >= 2,
        candidates: emojiIndex.search(_.trimStart(value, ':')) || []
      }
    }
  ),
  shouldUpdate((props, nextProps) => {
    // return true if popperStyle changed.
    const isPopperStyleChanged = !_.isEqual(props.popperStyles, nextProps.popperStyles)
    const isReferenceNodeChanged = props.referenceNode !== nextProps.referenceNode
    const isValueChanged = props.value !== nextProps.value
    const isForcedHideChanged = props.isForcedHide !== nextProps.isForcedHide
    const isCursorChanged = props.cursor !== nextProps.cursor
    return isPopperStyleChanged ||
      isReferenceNodeChanged ||
      isValueChanged ||
      isForcedHideChanged ||
      isCursorChanged
  }),
  withHandlers({
    onClickEmoji: ({onSelect}) => onSelect,
    confirmEmoji: ({cursor, onSelect, candidates, isShow}) => (e) => {
      if (!isShow || !candidates[cursor]) return undefined

      onSelect(candidates[cursor], e)

      // cancel event.
      e.preventDefault()
      e.stopPropagation()
      return false
    },
    // value might be +1 || -1
    moveCursor: ({cursor, setCursor, candidates, isShow}) => (value, e) => {
      if (!isShow) return undefined

      let nextCursor = cursor + value
      if (nextCursor < 0) {
        nextCursor = candidates.length
      } else if (nextCursor >= candidates.length) {
        nextCursor = 0
      }
      setCursor(nextCursor)

      e.preventDefault()
      return false
    },
  }),
  withHandlers((props) => {
    const {setPopperStyles, moveCursor, confirmEmoji, setIsForcedHide} = props

    let autoCompleteNode = null
    let popper = null
    let referenceNode = null
    let portal = null
    let unlisten = _.noop

    // enable text change handler of referenceNode.
    let observer = isBrowser ? new MutationObserver((_mutations) => {
      popper.scheduleUpdate()
    }) : {}

    const initialize = (referenceNode) => {
      popper = new Popper(
        referenceNode,
        autoCompleteNode,
        {
          placement: 'right-start-auto',
          removeOnDestroy: true,
          modifiers: {
            offset: {
              offset: '-4px, 16px'
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

    const onKeyDown = (e) => {
      // move upwards
      if (keycode(e) === 'up') {
        return moveCursor(-1, e)
      }

      // move downwards
      if (keycode(e) === 'down') {
        return moveCursor(1, e)
      }

      if (keycode(e) === 'enter') return confirmEmoji(e)

      if (keycode(e) === 'esc') {
        setIsForcedHide(true)
        e.preventDefault()
        return undefined
      }
    }

    return {
      setPickerRef: () => (ref) => {
        if (!ref) return
        autoCompleteNode = findDOMNode(ref)
      },

      update: () => (_referenceNode) => {
        if (!_referenceNode) return
        if (!popper) return initialize(_referenceNode)
        if (!portal) portal = appendPortalNode(PORTAL_CLASS)

        // if node reference changed
        if (referenceNode !== _referenceNode) {
          unlisten()
          observer.disconnect()

          // Update reference node after popper instantiated, means re-use popper instance always :)
          // SEE: https://github.com/FezVrasta/popper.js/issues/538
          popper.reference = _referenceNode
          popper.scheduleUpdate()

          // listen for mutation of referenceNode
          observer.observe(_referenceNode, {
            childList: true,
            subtree: true,
            characterData: true
          })

          // listen for keyDown event of referenceNode
          unlisten = bindOnClosestInput(_referenceNode, 'keydown', onKeyDown)

          referenceNode = _referenceNode
        }
      },

      getPortal: () => () => portal,

      destroy: () => () => {
        unlisten()
        popper && popper.disableEventListeners()
        popper && popper.destroy()
        observer.disconnect()
        removePortalNode(PORTAL_CLASS)

        portal = null
        popper = null
        observer = null
        unlisten = _.noop
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
    popperStyles,
    setPickerRef,
    onClickEmoji,
    candidates,
    numOfEmojis = 5, // count of candidates.
    isShow,
    isForcedHide,
    setIsForcedHide,
    getPortal,
    cursor,
    value = ''
  } = props

  let autoCompleteClass = styles.AutoComplete
  if (isShow && !isForcedHide) {
    autoCompleteClass += ` is-show`
  }

  let backdropClass = styles.Backdrop
  if (isShow && !isForcedHide) {
    backdropClass += ` is-show`
  }

  const component = (
    <div className={styles.AutoCompleteRoot}>
      <div
        className={autoCompleteClass}
        style={popperStyles}
        ref={setPickerRef}
      >
        <ul className={styles.Emojis}>
          {_.map(_.take(candidates, numOfEmojis), (emoji, i) => {
            let emojiClass = styles.Emoji
            if (i === cursor) {
              emojiClass += ' is-active'
            }
            return (
              <li
                key={emoji.id}
                className={emojiClass}
                onClick={(e) => onClickEmoji(emoji, e)}
              >
                <Emoji
                  emoji={emoji}
                  backgroundImageFn={() => SHEET_URL}
                  size={24}
                />
                <b className='colons'>{emoji.colons}</b>
              </li>
            )
          })}
        </ul>
      </div>

      <div
        className={backdropClass}
        onClick={() => setIsForcedHide(true)}
      />
    </div>
  )

  return isBrowser && getPortal() ? createPortal(
    component,
    getPortal()
  ) : component
})
