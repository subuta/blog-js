import { cloneElement } from 'react'
import {
  createPortal,
  findDOMNode
} from 'react-dom'
import _ from 'lodash'

import Popper from 'popper.js'

const isBrowser = typeof window !== 'undefined'
const PORTAL_CLASS = '__Menu__'

import {
  compose,
  withState,
  withHandlers,
  branch,
  renderComponent,
  lifecycle,
  shouldUpdate
} from 'recompose'

import withStyles from './style'
import { appendPortalNode } from 'src/views/utils/node'
import { bindOnClosestInput, removePortalNode } from '../../../utils/node'

const enhance = compose(
  withStyles,
  withState('isShow', 'setIsShow', false),
  withState('popperStyles', 'setPopperStyles', {}),
  shouldUpdate((props, nextProps) => {
    // return true if popperStyle changed.
    const isPopperStyleChanged = !_.isEqual(props.popperStyles, nextProps.popperStyles)
    const isTriggerNodeChanged = props.trigger !== nextProps.trigger
    const isShowChanged = props.isShow !== nextProps.isShow
    const isChildrenChanged = props.children !== nextProps.children
    return isPopperStyleChanged || isChildrenChanged || isShowChanged || isTriggerNodeChanged
  }),
  withHandlers((props) => {
    const {setPopperStyles} = props

    let menuRef = null
    let triggerRef = null
    let popper = null
    let portal = null

    const initialize = (triggerRefNode) => {
      popper = new Popper(
        triggerRefNode,
        menuRef,
        {
          placement: 'bottom-end-auto',
          removeOnDestroy: true,
          modifiers: {
            offset: {
              offset: '-2px, 8px'
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
      setMenuRef: () => (ref) => {
        if (!ref) return
        menuRef = findDOMNode(ref)
      },

      setTriggerRef: () => (ref) => {
        if (!ref) return
        if (!popper) return initialize(ref)
        if (!portal) portal = appendPortalNode(PORTAL_CLASS)

        // if node reference changed
        if (triggerRef !== ref) {
          // Update reference node after popper instantiated, means re-use popper instance always :)
          // SEE: https://github.com/FezVrasta/popper.js/issues/538
          popper.reference = ref
          popper.scheduleUpdate()

          triggerRef = ref
        }
      },

      getPortal: () => () => portal,

      syncPopper: ({isShow}) => () => {
        if (!isShow) return
        popper.scheduleUpdate()
      },

      getTriggerRef: () => () => triggerRef,

      destroy: () => () => {
        popper && popper.disableEventListeners()
        popper && popper.destroy()
        removePortalNode(PORTAL_CLASS)

        portal = null
        popper = null
      }
    }
  }),
  lifecycle({
    componentDidUpdate () {
      const {syncPopper} = this.props
      syncPopper()
    },

    componentWillUnmount () {
      const {destroy} = this.props
      destroy()
    }
  })
)

export default enhance((props) => {
  const {
    children,
    setIsShow,
    setMenuRef,
    setTriggerRef,
    getPortal,
    styles,
    isShow,
    popperStyles
  } = props

  let menuClass = styles.Menu
  if (isShow) {
    menuClass += ` is-show`
  }

  let backdropClass = styles.Backdrop
  if (isShow) {
    backdropClass += ` is-show`
  }

  const WrappedTrigger = cloneElement(
    props.trigger,
    {
      ref: setTriggerRef,
      onClick: () => setIsShow(true)
    }
  )

  let menu = (
    <div>
      <div
        className={backdropClass}
        onClick={() => setIsShow(false)}
      />

      <div
        className={menuClass}
        style={popperStyles}
        ref={setMenuRef}
      >
        {children}
      </div>
    </div>
  )

  if (isBrowser && getPortal()) {
    menu = createPortal(
      menu,
      getPortal()
    )
  }

  return (
    <div>
      {menu}
      {WrappedTrigger}
    </div>
  )
})
