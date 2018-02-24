import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import Sidebar from './Sidebar'

const {FILE} = NativeTypes

import _ from 'lodash'
import keycode from 'keycode'
import { Redirect } from 'react-router'

import Textarea from 'react-textarea-autosize'
import MdAddIcon from 'react-icons/lib/md/add'

import withStyles from './style'
import connect from './connect'

import CustomLoader from 'src/components/common/CustomLoader'
import Placeholder from 'src/components/common/Placeholder'
import Comment from 'src/components/common/Comment'

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
  ({channels, isChannelProgress}) => _.isEmpty(channels) || isChannelProgress,
  renderComponent((props) => {
    const {
      styles,
      match,
      location,
      channels
    } = props

    return (
      <div className={styles.Container}>
        <Sidebar
          channels={channels}
          match={match}
          location={location}
        />
        <div className={styles.Channels}>
          <div className={styles.Header}>
            <h4 className={styles.Title}>
            <span className="list-icon">
              <Placeholder style={{width: 16}} />
            </span>
              <span><Placeholder style={{opacity: 0.5, width: 100}} /></span>
            </h4>

            <div className={styles.Description}>
              <Placeholder style={{opacity: 0.5, width: 200}} />
            </div>
          </div>

          <div className={styles.CenteredContent}>
            <CustomLoader
              label='Channel is loading...'
              size={48}
              isShow
            />
          </div>
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
  withStyles,
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
  withProps(({channels, isChannelProgress, match}) => {
    // find channel using path params.
    const name = _.get(match, 'params.channelName', '')
    const channel = isChannelProgress ? null : _.find(channels, {name})
    return {
      channel,
      channelName: name
    }
  }),
  lifecycle({
    componentWillMount () {
      const {channel, channels, requestChannels, fetchChannelComments, scrollComments} = this.props

      // requestChannels only if empty.
      if (_.isEmpty(channels)) {
        requestChannels()
      }

      if (!channel) return

      fetchChannelComments(channel.id).then(() => {
        scrollComments()
      })
    },

    componentDidUpdate (prevProps) {
      const {channel, channelName, fetchChannelComments, scrollComments} = this.props
      if (!channel) return

      // fetch channel only if channelName updated.
      if (channelName !== prevProps.channelName) {
        fetchChannelComments(channel.id).then(() => {
          scrollComments()
        })
      }
    }
  }),
  withLoading,
  withHandlers({
    onKeyPress: ({createChannelComment, channel, draftText, setDraftText, scrollComments}) => (e) => {
      const key = keycode(e)

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()
        setDraftText('')
        createChannelComment({channelId: channel.id, text: draftText}).then(() => {
          scrollComments()
        })
      }
    },

    handleFileDrop: (props) => async (item, monitor) => {
      const {
        channel,
        signAttachment,
        createAttachment,
        uploadAttachment,
        createChannelComment
      } = props

      if (!monitor) return
      const droppedFiles = monitor.getItem().files
      const file = _.first(droppedFiles)
      const {name, type} = file

      // create attachment from file
      const {id, signedRequest, url} = await signAttachment({name, type})
      const attachment = await createAttachment({id, name, type, imageUrl: url})

      // then upload it to s3
      await uploadAttachment(file, signedRequest, url)

      // finally relate attachment to blank comment.
      createChannelComment({channelId: channel.id, text: '', attachmentId: attachment.id})
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
    connectDropTarget,
    styles,
    location,
    match
  } = props

  let channelsClass = styles.Channels
  if (isOver && canDrop) {
    channelsClass += ' can-drop'
  }

  // redirect to first channel if channel not specified.
  if (!channel && _.first(channels)) {
    return <Redirect to={`/chat/${_.first(channels).name}`} />
  }

  return connectDropTarget(
    <div className={styles.Container}>
      <Sidebar
        channels={channels}
        match={match}
        location={location}
      />
      <div className={channelsClass}>
        <div className={styles.DropTarget}>
          <h1>Drop file for upload.</h1>
        </div>

        <div className={styles.Header}>
          <h4 className={styles.Title}>
            <span className="list-icon">#</span>
            <span>{channel.name}</span>
          </h4>
          <div className={styles.Description}>
            <p>
              Descriptionがここにきます
            </p>
          </div>
        </div>
        <div className={styles.Content}>
          <div className={styles.Comments} ref={setCommentsRef}>
            {_.map(channelComments, (comment) => {
              return (
                <Comment key={comment.id} comment={comment} />
              )
            })}
          </div>

          <div className={styles.Footer}>
            <div className={styles.TextAreaWrapper}>
              <button><MdAddIcon className={styles.AddIcon} /></button>
              <div className="textarea">
              <Textarea
                className={styles.TextArea}
                onKeyPress={onKeyPress}
                onChange={(e) => setDraftText(e.target.value)}
                value={draftText}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
