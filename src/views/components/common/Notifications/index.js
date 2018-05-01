import React from 'react'
import _ from 'lodash'
import { createPortal } from 'react-dom'

import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group'

const isBrowser = typeof window !== 'undefined'
const PORTAL_CLASS = '__NOTIFICATIONS__'

import withStyles from './style'

import MdCloseIcon from 'react-icons/lib/md/close'
import MdCheckIcon from 'react-icons/lib/md/check'

import {
  compose,
  withHandlers,
  withState
} from 'recompose'
import { appendPortalNode } from 'src/views/utils/node'

const enhance = compose(
  withStyles,
  withState('notifications', 'setNotifications', []),
  withHandlers({
    removeNotification: ({notifications, setNotifications}) => (id) => {
      setNotifications(_.reject(notifications, {id}))
    }
  }),
  withHandlers({
    addNotification: (props) => (message, timeout = 2000) => {
      const {
        removeNotification,
        setNotifications
      } = props

      const id = _.uniqueId('notification')
      const notifications = [...props.notifications, {
        id,
        message
      }]

      setNotifications(notifications)
      _.delay(() => removeNotification(id), timeout)
    },

    ask: (props) => (message, handlers = {}) => {
      const {
        removeNotification,
        setNotifications
      } = props

      const {
        onConfirm = _.noop,
        onClose = _.noop
      } = handlers

      const id = _.uniqueId('notification')
      const notifications = [...props.notifications, {
        id,
        message,
        onConfirm: () => {
          requestAnimationFrame(() => removeNotification(id));
          onConfirm()
        },

        onClose: () => {
          requestAnimationFrame(() => removeNotification(id));
          onClose()
        }
      }]

      setNotifications(notifications)
    }
  }),
  withHandlers((props) => {
    let portal = appendPortalNode(PORTAL_CLASS)

    const {
      instance = _.noop
    } = props

    const notify = (message, timeout) => props.addNotification(message, timeout)
    const ask = (message, handlers) => props.ask(message, handlers)

    // FIXME: More better way to expose editor api.
    instance({
      notify,
      ask
    })

    return {
      getPortal: () => () => portal
    }
  })
)

export default enhance((props) => {
  const {
    styles,
    getPortal,
    notifications
  } = props

  const component = (
    <TransitionGroup className={styles.Notifications}>
      {_.map(notifications, (props) => {
        const {
          id,
          message,
          onConfirm,
          onClose
        } = props

        return (
          <CSSTransition
            key={id}
            timeout={300}
            classNames="fade"
          >
            <div className={styles.Notification}>
              <div>
                {message}
              </div>

              {onConfirm && onClose && (
                <footer>
                  <button
                    className={styles.ButtonNo}
                    onClick={onClose}
                  >
                    <MdCloseIcon /> No
                  </button>

                  <button
                    className={styles.ButtonYes}
                    onClick={onConfirm}
                  >
                    <MdCheckIcon /> Yes
                  </button>
                </footer>
              )}
            </div>
          </CSSTransition>
        )
      })}
    </TransitionGroup>
  )

  return isBrowser && getPortal() ? createPortal(
    component,
    getPortal()
  ) : component
})
