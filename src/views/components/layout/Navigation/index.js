import React from 'react'
import _ from 'lodash'

import {
  compose,
  lifecycle,
  withProps
} from 'recompose'

import MdChatIcon from 'react-icons/lib/md/chat'
import MdSearchIcon from 'react-icons/lib/md/search'
import GoBookIcon from 'react-icons/lib/go/book'
import SignInIcon from 'react-icons/lib/go/sign-in'

import Avatar from 'src/views/components/common/Avatar'
import ActiveLink from 'src/views/components/common/ActiveLink'
import Menu from 'src/views/components/common/Menu'
import Tooltip from 'src/views/components/common/Tooltip'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect,
  withProps(({currentUser}) => {
    return {
      isAuthenticated: !!currentUser
    }
  }),
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
    isAuthenticated,
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

        <Tooltip
          title="Go to chat"
          placement="right"
          size="small"
          offset='0, 8px'
        >
          <ActiveLink
            isActive={(router) => _.startsWith(router.pathname, '/channel')}
            className={styles.ChatApp}
            href='/channels'
            as='/c'
          >
            <MdChatIcon />
          </ActiveLink>
        </Tooltip>

        <Tooltip
          title="Go to wiki"
          placement="right"
          size="small"
          offset='0, 8px'
        >
          <ActiveLink
            isActive={(router) => _.startsWith(router.pathname, '/article')}
            className={styles.WikiApp}
            href='/articles'
            as='/w'
          >
            <GoBookIcon />
          </ActiveLink>
        </Tooltip>
      </div>

      <div className={styles.Bottom}>
        {isAuthenticated ? (
          <Menu
            trigger={(
              <div className={styles.User}>
                <Avatar
                  avatar={avatar}
                  nickname={nickname}
                  rounded
                />
              </div>
            )}
          >
            <ul>
              <li>
                <ActiveLink
                  href='/auth/profile'
                  as='/auth/profile'
                >
                  Update your profile
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  href='/auth/logout'
                  as='/auth/logout'
                >
                  Logout
                </ActiveLink>
              </li>
            </ul>
          </Menu>
        ) : (
          <Tooltip
            title="Click to Login!"
            placement="right"
            size="small"
            offset='0, 8px'
          >
            <ActiveLink
              className={styles.IconWrapper}
              href='/auth/login'
              as='/auth/login'
            >
              <SignInIcon />
            </ActiveLink>
          </Tooltip>
        )}
      </div>
    </div>
  )
})
