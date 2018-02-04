import React from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

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
  renderComponent
} from 'recompose'

const enhance = compose(
  withStyles,
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
        <a className={styles.Item} href="#">
          <MdSearchIcon />
        </a>

        <span className={styles.Item}>
        <MdChatIcon />
      </span>

        <a className={styles.Item} href="#">
          <MdInsertDriveFile />
        </a>
      </div>

      <div className={styles.Bottom}>
        <div className={styles.User}>
          <Avatar
            size={36}
            borderRadius="50%"
            avatar={avatar}
            nickname={nickname}
          />
        </div>
      </div>
    </div>
  )
})
