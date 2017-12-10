import React from 'react'
import _ from 'lodash'

import Textarea from "react-textarea-autosize";

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
        <div className={classes.Comments}>
          {_.map(comments, ({ id, comment, createdAt }) => {
            return <p key={id}>{comment} <small>{createdAt}</small></p>
          })}
        </div>

        <div className={classes.Footer}>
          <div className={classes.TextAreaWrapper}>
            <button>+</button>
            <div className="textarea">
              <Textarea className={classes.TextArea}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
