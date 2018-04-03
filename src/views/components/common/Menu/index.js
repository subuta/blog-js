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
    let popper = null
    let portal = null

    const initialize = (props) => {
      if (popper) return

      const {
        placement,
        modifiers = {}
      } = props

      popper = new Popper(
        findDOMNode(props.trigger),
        menuRef,
        {
          placement: placement || 'auto',
          removeOnDestroy: true,

          modifiers: {
            ...modifiers,

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

      appendPortalNode: () => () => {
        portal = appendPortalNode(PORTAL_CLASS)
      },

      getPortal: () => () => portal,

      onUpdate: () => (prevProps, props) => {
        if (!props.isShow) return
        if (!popper) return initialize(props)

        // if node reference changed
        if (prevProps.trigger !== props.trigger) {
          // Update reference node after popper instantiated, means re-use popper instance always :)
          // SEE: https://github.com/FezVrasta/popper.js/issues/538
          popper.reference = props.trigger
        }

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
    componentDidMount () {
      const {appendPortalNode} = this.props
      appendPortalNode()
    },

    componentDidUpdate (prevProps) {
      const {onUpdate} = this.props
      onUpdate(prevProps, this.props)
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
    setMenuRef,
    getPortal,
    styles,
    isShow,
    popperStyles,
    onHide = _.noop
  } = props

  let menuClass = styles.Menu
  if (isShow) {
    menuClass += ` is-show`
  }

  let backdropClass = styles.Backdrop
  if (isShow) {
    backdropClass += ` is-show`
  }

  let menu = (
    <div>
      <div
        className={backdropClass}
        onClick={onHide}
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

  return menu
})
