import React from 'react'
import _ from 'lodash'
import { Route, Switch } from 'react-router'
import { NavLink } from 'react-router-dom'

import withStyles from './style'
import connect from './connect'

import SvgIcon from 'src/components/common/SvgIcon'
import Placeholder from 'src/components/common/Placeholder'

import {
  compose,
  branch,
  lifecycle,
  renderComponent
} from 'recompose'

// initial state.
const withLoading = branch(
  ({channels, isChannelProgress}) => _.isEmpty(channels) && isChannelProgress,
  renderComponent(() => {
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

          <h4><Placeholder style={{width: 60}} /></h4>

          <ul className={styles.Notes}>
            <li>
              <span className="list-icon"><Placeholder style={{opacity: 0.5, width: 16}} /></span>
              <div style={{lineHeight: 0}}><Placeholder style={{opacity: 0.5, width: 120}} /></div>
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
  connect,
  lifecycle({
    componentWillMount () {
      this.props.requestChannels()
      this.props.requestMe()
    }
  }),
  withLoading
)

export default enhance((props) => {
  const {
    channels,
    currentUser,
    styles
  } = props

  return (
    <div className={styles.Sidebar}>
      <div className={styles.Menus}>
        <div className={styles.Logo}>
          <SvgIcon name="logo-white" />
        </div>

        <h4>Channels</h4>

        <ul className={styles.Channels}>
          {_.map(channels, ({id, name}) => {
            return (
              <li key={id}>
                <NavLink to={`/${name}`} activeClassName="is-active">
                  <span className="list-icon">#</span>
                  <span>{name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>

        <h4>Note</h4>

        <ul className={styles.Notes}>
          <li>
            <span className="list-icon"><SvgIcon name="note" /></span>
            <div>ReactでHOCを作るのに必要なものほげほげほげほげ</div>
          </li>
        </ul>
      </div>

      <div className={styles.Login}>
        {currentUser ? currentUser.nickname : ''}
      </div>
    </div>
  )
})
