import React from 'react'
import _ from 'lodash'
import keycode from 'keycode'

import Textarea from 'react-textarea-autosize'
import MdAddIcon from 'react-icons/lib/md/add'

import classes from './style'
import connect from './connect'

import CustomLoader from 'src/components/common/CustomLoader'
import Placeholder from 'src/components/common/Placeholder'

import {
  compose,
  branch,
  renderComponent,
  lifecycle,
  withState,
  withProps,
  withHandlers
} from 'recompose'

const withLoading = branch(
  ({channel, isChannelProgress}) => !channel || isChannelProgress,
  // ({channel, isChannelProgress}) => true,
  renderComponent(() => {
    return (
      <div className={classes.Channels}>
        <div className={classes.Header}>
          <h4 className={classes.Title}>
            <span className="list-icon">
              <Placeholder style={{width: 16}} />
            </span>
            <span><Placeholder style={{opacity: 0.5, width: 100}} /></span>
          </h4>

          <div className={classes.Description}>
            <Placeholder style={{opacity: 0.5, width: 200}} />
          </div>
        </div>

        <div className={classes.CenteredContent}>
          <CustomLoader
            isShow={true}
            label='Channel is loading...'
            size={48}
          />
        </div>
      </div>
    )
  }),
  _.identity
)

const enhance = compose(
  connect,
  withState('draftText', 'setDraftText', ''),
  withLoading,
  lifecycle({
    componentWillMount () {
      const { channel, requestChannel } = this.props
      // requestChannel(channel.id)
    }
  }),
  withHandlers({
    onKeyPress: ({createComment, draftText, setDraftText}) => (e) => {
      const key = keycode(e)

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()
        createComment({text: draftText})
        setDraftText('')
      }
    }
  })
)

export default enhance((props) => {
  const {
    comments,
    onKeyPress,
    setDraftText,
    draftText,
    channel
  } = props

  return (
    <div className={classes.Channels}>
      <div className={classes.Header}>
        <h4 className={classes.Title}>
          <span className="list-icon">#</span>
          <span>{channel.name}</span>
        </h4>
        <div className={classes.Description}>
          <p>
            Descriptionがここにきます
          </p>
        </div>
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
            <button><MdAddIcon className={classes.AddIcon} /></button>
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
