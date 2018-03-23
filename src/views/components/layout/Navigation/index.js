import React from 'react'
import _ from 'lodash'

import {
  compose,
  branch,
  lifecycle,
  renderComponent,
  withHandlers
} from 'recompose'

import MdChatIcon from 'react-icons/lib/md/chat'
import MdSearchIcon from 'react-icons/lib/md/search'
import GoBookIcon from 'react-icons/lib/go/book'

import Avatar from 'src/views/components/common/Avatar'
import ActiveLink from 'src/views/components/common/ActiveLink'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect,
  lifecycle({
    componentWillMount () {
      this.props.requestMe().catch(err => {
        if (err.status === 401) return
        console.log('[caught at navigation]', err)
      })
    }
  })
)

export default enhance((props) => {
  const {
    currentUser,
    styles,
    isShowMenu
  } = props

  const avatar = _.get(currentUser, 'avatar')
  const nickname = _.get(currentUser, 'nickname')

  let navigationClass = styles.Navigation
  if (isShowMenu) {
    navigationClass += ` is-show`
  }

  return (
    <div className={navigationClass}>
      <div className={styles.Top}>
        {/*
        <a className={styles.Item} href="#">
          <MdSearchIcon />
        </a>
        */}

        <ActiveLink
          isActive={(router) => _.startsWith(router.pathname, '/channel')}
          className={styles.ChatApp}
          href='/channels'
          as='/c'
        >
          <MdChatIcon />
        </ActiveLink>

        <ActiveLink
          isActive={(router) => _.startsWith(router.pathname, '/article')}
          className={styles.WikiApp}
          href='/articles'
          as='/w'
        >
          <GoBookIcon />
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
