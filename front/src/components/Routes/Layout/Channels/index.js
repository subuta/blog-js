import React from 'react'
import _ from 'lodash'
import keycode from 'keycode'

import Textarea from 'react-textarea-autosize'

import classes from './style'
import connect from './connect'

import {
  compose,
  lifecycle,
  withState,
  withHandlers
} from 'recompose'

const enhance = compose(
  connect,
  withState('draftText', 'setDraftText', ''),
  lifecycle({
    componentWillMount () {
      this.props.requestComments()
    }
  }),
  withHandlers({
    onKeyPress: ({createComment, draftText}) => (e) => {
      const key = keycode(e)

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()
        createComment({text: draftText})
      }
    }
  })
)

export default enhance((props) => {
  const {
    comments,
    onKeyPress,
    setDraftText,
    draftText
  } = props
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
          {_.map(comments, ({id, text, createdAt}) => {
            return <p key={id}>{text}
              <small>{createdAt}</small>
            </p>
          })}
        </div>

        <div className={classes.Footer}>
          <div className={classes.TextAreaWrapper}>
            <button>+</button>
            <div className="textarea">
              <Textarea
                className={classes.TextArea}
                onKeyPress={onKeyPress}
                onChange={(e) => setDraftText(e.target.value)}
                value={draftText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
