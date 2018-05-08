import React from 'react'

import _ from 'lodash'
import moment from 'src/views/utils/moment'
import withStyles from './style'

import Waypoint from 'react-waypoint'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  withStyles,
  lifecycle({
    componentWillMount () {
      const {onBeforeMount = _.noop} = this.props
      onBeforeMount()
    },

    componentWillUnmount () {
      const {onBeforeUnmount = _.noop} = this.props
      onBeforeUnmount()
    }
  })
)

// FIXME: More better sticky behavior.
// Date-Line separator
export default enhance((props) => {
  const {
    styles,
    date,
    onEnter = _.noop,
    onLeave = _.noop
  } = props

  const dateLineClass = `${styles.DateLine} date-line`

  const Trigger = (
    <Waypoint
      onEnter={({previousPosition}) => {
        // only handle header collision events
        if (previousPosition === 'below') return
        onEnter(date)
      }}
      onLeave={({currentPosition}) => {
        // only handle header collision events
        if (currentPosition === 'below') return
        onLeave(date)
      }}
      topOffset={0}
    />
  )

  if (!date) {
    return (
      <div className={dateLineClass}/>
    )
  }

  const diff = moment().diff(date, 'days')

  if (diff === 0) {
    return (
      <div className={dateLineClass}>
        {Trigger}
        <b>Today</b>
      </div>
    )
  } else if (diff === 1) {
    return (
      <div className={dateLineClass}>
        {Trigger}
        <b>Yesterday</b>
      </div>
    )
  }

  let format = 'dddd, MMMM Do'
  // if years ago.
  if (diff >= 365) {
    format = 'MMMM Do, YYYY'
  }

  return (
    <div className={dateLineClass}>
      {Trigger}
      <b>{date.format(format)}</b>
    </div>
  )
})
