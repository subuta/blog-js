import {
  compose,
  withHandlers,
  lifecycle
} from 'recompose'

import React from 'react'

import MaterialButton from 'src/views/components/common/MaterialButton'

import {
  createPortal
} from 'react-dom'

import { CSSTransition } from 'react-transition-group';

import _ from 'lodash'

const isBrowser = typeof window !== 'undefined'
const PORTAL_CLASS = '__Modal__'

import {
  appendPortalNode,
  removePortalNode
} from 'src/views/utils/node'

import withStyles from './style'

const enhance = compose(
  withStyles,
  withHandlers(() => {
    let portal = null

    return {
      appendPortalNode: () => () => {
        portal = appendPortalNode(PORTAL_CLASS)
      },

      getPortal: () => () => portal,
    }
  }),
  lifecycle({
    componentDidMount () {
      const {appendPortalNode} = this.props
      appendPortalNode()
    },

    componentWillUnmount () {
      removePortalNode(PORTAL_CLASS)
    }
  })
)

export default enhance((props) => {
  const {
    styles,
    getPortal,
    isShow,
    title,
    className,
    cancelText = 'Cancel',
    okText = 'OK',
    onSubmit = _.noop,
    onClose = _.noop
  } = props

  let modalClass = styles.Modal
  if (className) {
    modalClass += ` ${className}`
  }

  let modal = (
    <CSSTransition
      in={isShow}
      classNames="modal"
      timeout={300}
      unmountOnExit
    >
      <div className={modalClass}>
        <div className={styles.Body}>
          {title && (
            <header>
              {title}
            </header>
          )}

          <div className='modal-content'>
            {props.children}
          </div>

          <footer>
            <MaterialButton
              wavesClasses={['waves-float']}
              onClick={onClose}
              ghost
              secondary
            >
              {cancelText}
            </MaterialButton>

            <MaterialButton
              wavesClasses={['waves-float']}
              onClick={onSubmit}
              ghost
            >
              {okText}
            </MaterialButton>
          </footer>
        </div>

        <div
          className={styles.Backdrop}
          onClick={onClose}
        />
      </div>
    </CSSTransition>
  )

  if (isBrowser && getPortal()) {
    modal = createPortal(
      modal,
      getPortal()
    )
  }

  return modal
})
