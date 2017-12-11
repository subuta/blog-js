import React from 'react'
import _ from 'lodash'
import { Route, Switch, Redirect } from 'react-router'

import Sidebar from './Sidebar'
import Content from './Content'

import classes from './style'
import connect from './connect'

import {
  compose,
  withProps,
  lifecycle,
  branch,
  renderComponent
} from 'recompose'

const enhance = compose(
  connect,
  withProps(({channels, match}) => {
    // find channel using path params.
    const name = _.get(match, 'params.channelName', '')
    const channel = _.find(channels, { name })
    return { channel }
  }),
  lifecycle({
    componentWillMount () {
      this.props.requestChannels()
    }
  })
)

export default enhance((props) => {
  const {
    channel,
    channels
  } = props

  // redirect to first channel if channel not specified.
  if (!channel && _.first(channels)) {
    return <Redirect to={`/${_.first(channels).name}`} />
  }

  return (
    <div className={classes.Container}>
      <Sidebar {...props} />
      <Content {...props} />
    </div>
  )
})
