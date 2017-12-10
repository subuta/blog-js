import React from 'react'
import _ from 'lodash'

import classes from './style'
import connect from './connect'

import {
  compose,
  lifecycle
} from 'recompose'

const enhance = compose(
  connect,
  lifecycle({
    componentWillMount() {
      this.props.requestComments()
    }
  })
)

export default enhance(({ comments }) => {
  return (
    <div className={classes.Channels}>
      <div className={classes.Header}>
        <h4 className={classes.Title}>
          <span className="list-icon">#</span>
          <span>i_subuta</span>
        </h4>
        <p className={classes.Description}>
          Descriptionがここにきます
        </p>
      </div>
      <div className={classes.Content}>
        {_.map(comments, ({ id, comment }) => {
          return <p key={id}>{comment}</p>
        })}
      </div>
    </div>
  )
})
