import React from 'react'
import _ from 'lodash'
import { withRouter } from 'next/router'
import {
  compose
} from 'recompose'

import Sidebar from 'src/views/components/layout/Sidebar'
import ActiveLink from 'src/views/components/common/ActiveLink'

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
    <Sidebar sidebarClass="is-wiki">
      <div className={styles.Menus}>
        <h4>Tags</h4>

        <ul className={styles.Articles}>
          {_.map(tags, ({id, label}) => {
            return (
              <li key={id}>
                <ActiveLink
                  href={`/article?id=${id}`}
                  as={`/w/${id}`}
                >
                  <span className="list-icon">#</span>
                  <span>{label}</span>
                </ActiveLink>
              </li>
            )
          })}
        </ul>
      </div>
    </Sidebar>
  )
})
