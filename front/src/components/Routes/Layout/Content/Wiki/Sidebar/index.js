import React from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import withStyles from './style'

import SvgIcon from 'src/components/common/SvgIcon'
import Placeholder from 'src/components/common/Placeholder'

import {
  compose,
  branch,
  withProps,
  renderComponent
} from 'recompose'

// initial state.
const withLoading = branch(
  // ({channels}) => _.isEmpty(channels),
  ({channels}) => false,
  renderComponent(({styles}) => {
    return (
      <div className={styles.Sidebar}>
        <div className={styles.Menus}>
          <div className={styles.Logo}>
            <SvgIcon name="logo-white" />
          </div>

          <h4><Placeholder style={{width: 100}} /></h4>

          <ul className={styles.Channels}>
            <li>
              <a href="">
                <span className="list-icon"><Placeholder style={{opacity: 0.5, width: 12}} /></span>
                <span><Placeholder style={{opacity: 0.5, width: 80}} /></span>
              </a>
            </li>

            <li>
              <a href="">
                <span className="list-icon"><Placeholder style={{opacity: 0.5, width: 12}} /></span>
                <span><Placeholder style={{opacity: 0.5, width: 40}} /></span>
              </a>
            </li>

            <li>
              <a href="">
                <span className="list-icon"><Placeholder style={{opacity: 0.5, width: 12}} /></span>
                <span><Placeholder style={{opacity: 0.5, width: 60}} /></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }),
  _.identity
)

const enhance = compose(
  withStyles,
  withLoading
)

export default enhance((props) => {
  const {
    channels,
    styles
  } = props
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Menus}>
        <div className={styles.Logo}>
          <SvgIcon name="logo-white" />
        </div>

        <h4>Tags</h4>

        <ul className={styles.Channels}>
          {_.map(channels, ({id, name}) => {
            return (
              <li key={id}>
                <NavLink to={`/chat/${name}`} activeClassName="is-active">
                  <span className="list-icon">#</span>
                  <span>{name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
})
