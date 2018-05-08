import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'
import {
  compose,
  lifecycle,
  withState
} from 'recompose'

import Sidebar from 'src/views/components/layout/Sidebar'
import ActiveLink from 'src/views/components/common/ActiveLink'

import FaHashTagIcon from 'react-icons/lib/fa/hashtag'

import connect from './connect'
import withStyles from './style'

const enhance = compose(
  withState('isMounted', 'setIsMounted', false),
  withRouter,
  withStyles,
  connect,
  lifecycle({
    componentDidMount () {
      this.props.setIsMounted(true)
    }
  })
)

export default enhance((props) => {
  const {
    styles,
    channels,
    unreadComments,
    isMounted
  } = props

  return (
    <Sidebar
      className={styles.Sidebar}
      app="chat"
    >
      <div className={styles.Menus}>
        <h4>Channels</h4>

        <ul className={styles.List}>
          {_.map(channels, ({id, name}) => {
            let channelClass = styles.ChannelLink
            // Dirty hack for Universal rendering.
            if (isMounted && unreadComments[id]) {
              channelClass += ' has-unread'
            }

            return (
              <li key={id}>
                <ActiveLink
                  className={channelClass}
                  href={`/channel?name=${name}`}
                  as={`/c/${name}`}
                >
                  <span className="list-icon"><FaHashTagIcon /></span>
                  <span className="name">{name}</span>
                </ActiveLink>
              </li>
            )
          })}
        </ul>
      </div>
    </Sidebar>
  )
})
