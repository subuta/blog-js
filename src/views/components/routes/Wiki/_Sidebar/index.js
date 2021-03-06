import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'
import {
  compose
} from 'recompose'

import Sidebar from 'src/views/components/layout/Sidebar'
import ActiveLink from 'src/views/components/common/ActiveLink'

import FaTagIcon from 'react-icons/lib/fa/tag'

import connect from './connect'
import withStyles from './style'

const enhance = compose(
  withRouter,
  withStyles,
  connect
)

export default enhance((props) => {
  const {
    styles,
    tags
  } = props

  return (
    <Sidebar
      className={styles.Sidebar}
      app="wiki"
    >
      <div className={styles.Menus}>
        <h4>Tags</h4>

        <ul className={styles.List}>
          {_.map(tags, ({id, label}) => {
            return (
              <li key={id}>
                <ActiveLink
                  href={`/articles?tag=${label}`}
                  as={`/w?tag=${label}`}
                >
                  <span className="list-icon"><FaTagIcon /></span>
                  <span className="name">{label}</span>
                </ActiveLink>
              </li>
            )
          })}
        </ul>
      </div>
    </Sidebar>
  )
})
