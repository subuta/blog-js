import React from 'react'
import {
  compose
} from 'recompose'

import connect from './connect'
import withStyles from './style'

import MdSearchIcon from 'react-icons/lib/md/search'

import SvgIcon from 'src/views/components/common/SvgIcon'

const enhance = compose(
  withStyles,
  connect
)

export default enhance((props) => {
  const {
    styles,
    showMenu
  } = props

  return (
    <div className={styles.Header}>
      <div className="logo">
        <i onClick={() => showMenu()}><SvgIcon name="logo-small"/></i>
      </div>

      <div className="action">
        <div className={styles.SearchBar}>
          <MdSearchIcon />
          <input
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  )
})
