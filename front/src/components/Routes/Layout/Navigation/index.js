import React from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import withStyles from './style'

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
)

export default enhance((props) => {
  const {
    channels,
    currentUser,
    styles
  } = props

  return (
    <div className={styles.Navigation}>
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
  )
})
