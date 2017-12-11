import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const {FILE} = NativeTypes

import _ from 'lodash'
import keycode from 'keycode'
import { Redirect } from 'react-router'

import Textarea from 'react-textarea-autosize'
import MdAddIcon from 'react-icons/lib/md/add'

import classes from './style'
import connect from './connect'

import CustomLoader from 'src/components/common/CustomLoader'
import Placeholder from 'src/components/common/Placeholder'

import {
  compose,
  branch,
  onlyUpdateForKeys,
  shouldUpdate,
  renderComponent,
  lifecycle,
  withState,
  withProps,
  withHandlers
} from 'recompose'

const withLoading = branch(
  ({channel, isChannelProgress}) => !channel && isChannelProgress,
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

const dropTarget = {
  drop (props, monitor) {
    if (props.handleFileDrop) {
      props.handleFileDrop(props, monitor)
    }
  }
}

const withFileDropHandler = DropTarget(
  () => [FILE],
  dropTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)

const enhance = compose(
  connect,
  withState('draftText', 'setDraftText', ''),
  withHandlers(() => {
    let $comments
    return {
      setCommentsRef: () => (ref) => {
        $comments = findDOMNode(ref)
      },

      scrollComments: () => () => {
        requestAnimationFrame(() => {
          $comments.scrollTop = $comments.scrollHeight
        })
      }
    }
  }),
  withProps(({channels, match}) => {
    // find channel using path params.
    const name = _.get(match, 'params.channelName', '')
    const channel = _.find(channels, {name})
    return {
      channel,
      channelName: name
    }
  }),
  withLoading,
  lifecycle({
    componentWillMount () {
      const {channel, fetchChannelComments, scrollComments} = this.props
      if (!channel) return
      fetchChannelComments(channel.id).then(() => {
        scrollComments()
      })
    },

    componentDidUpdate (prevProps) {
      const {channel, channelName, fetchChannelComments, scrollComments} = this.props
      // fetch channel only if channelName updated.
      if (channelName !== prevProps.channelName) {
        fetchChannelComments(channel.id).then(() => {
          scrollComments()
        })
      }
    }
  }),
  withHandlers({
    onKeyPress: ({createChannelComment, channel, draftText, setDraftText, scrollComments}) => (e) => {
      const key = keycode(e)

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()
        setDraftText('')
        createChannelComment(channel.id, {text: draftText}).then(() => {
          scrollComments()
        })
      }
    },

    handleFileDrop: ({createAttachment, uploadAttachment}) => (item, monitor) => {
      if (monitor) {
        const droppedFiles = monitor.getItem().files
        const file = _.first(droppedFiles)
        const {name, type} = file
        createAttachment({name, type}).then(({result}) => {
          const {signedRequest, url} = result
          uploadAttachment(file, signedRequest, url).then((res) => {
            console.log('done!!!')
            console.log('res', res)
          })
        })
      }
    }
  }),
  withFileDropHandler
)

export default enhance((props) => {
  const {
    channelComments,
    onKeyPress,
    setCommentsRef,
    setDraftText,
    draftText,
    channels,
    channel,
    handleFileDrop,
    isOver,
    canDrop,
    connectDropTarget
  } = props

  let channelsClass = classes.Channels
  if (isOver && canDrop) {
    channelsClass += ' can-drop'
  }

  // redirect to first channel if channel not specified.
  if (!channel && _.first(channels)) {
    return <Redirect to={`/${_.first(channels).name}`} />
  }

  return connectDropTarget(
    <div className={channelsClass}>
      <div className={classes.DropTarget}>
        <h1>Drop file for upload.</h1>
      </div>

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
        <div className={classes.Comments} ref={setCommentsRef}>
          {_.map(channelComments, ({id, text, createdAt}) => {
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
