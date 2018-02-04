import React from 'react'
import _ from 'lodash'
import { NavLink, withRouter } from 'react-router-dom'

import withStyles from './style'
import connect from './connect'

import Avatar from 'src/components/common/Avatar'

import MdChatIcon from 'react-icons/lib/md/chat'
import MdSearchIcon from 'react-icons/lib/md/search'
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file'

import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withHandlers
} from 'recompose'

const enhance = compose(
  withStyles,
  withRouter,
  connect,
  lifecycle({
    componentWillMount () {
      this.props.requestMe()
    }
  })
)

export default enhance((props) => {
  const {
    currentUser,
    styles
  } = props

  const avatar = _.get(currentUser, 'avatar')
  const nickname = _.get(currentUser, 'nickname')

  return (
    <div className={styles.Navigation}>
      <div className={styles.Top}>
        {/*
        <a className={styles.Item} href="#">
          <MdSearchIcon />
        </a>
        */}

        <NavLink
          to={`/chat`}
          className={`${styles.ChatApp}`}
          activeClassName="is-active"
        >
          <MdChatIcon />
        </NavLink>

        <NavLink
          to={`/wiki`}
          className={`${styles.WikiApp}`}
          activeClassName="is-active"
        >
          <MdInsertDriveFile />
        </NavLink>
      </div>

      <div className={styles.Bottom}>
        <div className={styles.User}>
          <Avatar
            size={40}
            borderRadius="50%"
            avatar={avatar}
            nickname={nickname}
          />
        </div>
      </div>
    </div>
  )
})
