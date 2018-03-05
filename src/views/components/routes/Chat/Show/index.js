import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const {FILE} = NativeTypes

import _ from 'lodash'
import keycode from 'keycode'

import Textarea from 'react-textarea-autosize'
import MdAddIcon from 'react-icons/lib/md/add'

import withStyles from './style'
import connect from './connect'

import Layout from 'src/views/components/layout/Layout'
import ChannelSidebar from 'src/views/components/routes/Chat/_Sidebar'

import Comment from 'src/views/components/common/Comment'

import {
  compose,
  branch,
  renderComponent,
  lifecycle,
  withState,
  withProps,
  withHandlers,
  toClass
} from 'recompose'

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
          if (!$comments) return
          $comments.scrollTop = $comments.scrollHeight
        })
      }
    }
  }),
  lifecycle({
    // componentDidUpdate (prevProps) {
    //   const {
    //     channel,
    //     channelName,
    //     channelComments,
    //     fetchChannelComments,
    //     scrollComments
    //   } = this.props
    //
    //   if (!channel) return
    //
    //   // fetch channel only if channelName updated.
    //   if (_.isEmpty(channelComments) || channelName !== prevProps.channelName) {
    //     fetchChannelComments(channel.id).then(() => {
    //       scrollComments()
    //     })
    //   }
    // }
  }),
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
  })
)

const enhanceChatContent = compose(
  withFileDropHandler
)

const ChatContent = enhanceChatContent((props) => {
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

  return connectDropTarget(
    <div className={styles.ChatContent}>
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
                <Comment key={comment.id} comment={comment}/>
              )
            })}
          </div>

          <div className={styles.Footer}>
            <div className={styles.TextAreaWrapper}>
              <button><MdAddIcon className={styles.AddIcon}/></button>
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

export default enhance((props) => {
  return (
    <Layout>
      <ChannelSidebar/>
      <ChatContent {...props}/>
    </Layout>
  )
})
