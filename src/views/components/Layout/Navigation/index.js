import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'

import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withHandlers
} from 'recompose'

import MdChatIcon from 'react-icons/lib/md/chat'
import MdSearchIcon from 'react-icons/lib/md/search'
import MdInsertDriveFile from 'react-icons/lib/md/insert-drive-file'

import Avatar from 'src/views/components/common/Avatar'
import ActiveLink from 'src/views/components/common/ActiveLink'

import withStyles from './style'
import connect from './connect'

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
    styles,
    router
  } = props

  const getActiveClass = (pathname) => router.pathname === pathname ? 'is-active' : ''

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

        <ActiveLink
          className={styles.ChatApp}
          href='/channels'
          as='/c'
        >
          <MdChatIcon />
        </ActiveLink>

        <ActiveLink
          className={styles.ChatApp}
          href='/wiki-index'
          as='/w'
        >
          <MdInsertDriveFile />
        </ActiveLink>
      </div>

      <div className={styles.Bottom}>
        <div className={styles.User}>
          <Avatar
            avatar={avatar}
            nickname={nickname}
            rounded
          />
        </div>
      </div>
    </div>
  )
})
