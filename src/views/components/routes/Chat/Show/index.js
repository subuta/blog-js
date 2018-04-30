import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const {FILE} = NativeTypes

import _ from 'lodash'
import keycode from 'keycode'
import moment from 'moment'

import Textarea from 'react-textarea-autosize'
import MdAddIcon from 'react-icons/lib/md/add'
import Waypoint from 'react-waypoint'

import FaHashTagIcon from 'react-icons/lib/fa/hashtag'

import withStyles from './style'
import connect from './connect'

import Layout from 'src/views/components/layout/Layout'

import Sidebar from '../_Sidebar'
import Content from '../_Content'

import Comment from 'src/views/components/common/Comment'
import Editor from 'src/views/components/common/Editor'
import SvgIcon from 'src/views/components/common/SvgIcon'

import {
  compose,
  withState,
  lifecycle,
  withHandlers
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
  withState('initialText', 'setInitialText', ''),
  withHandlers(() => {
    let $comments
    let editorInstance

    return {
      setCommentsRef: () => (ref) => {
        $comments = findDOMNode(ref)
      },

      setEditorInstance: () => (instance) => {
        editorInstance = instance
      },

      resetEditor: () => (initialValue) => {
        if (!editorInstance) return
        editorInstance.reset(initialValue)
      },

      focusEditor: () => () => {
        if (!editorInstance) return
        editorInstance.focus()
      },

      scrollComments: () => () => {
        requestAnimationFrame(() => {
          if (!$comments) return
          $comments.scrollTop = $comments.scrollHeight
        })
      }
    }
  }),
  withHandlers({
    onAddReaction: ({addReaction}) => (comment, emoji) => {
      addReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })
    },

    onRemoveReaction: ({removeReaction}) => (comment, emoji) => {
      removeReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })
    },

    onEditComment: ({updateComment}) => (comment) => {
      updateComment(comment.id, {text: 'updated!'})
    },

    // onUpdateComment: ({updateComment}) => (comment) => {
    //   console.log('edit!', comment)
    // },

    onDeleteComment: ({deleteComment}) => (comment) => {
      deleteComment(comment.id, comment)
    },

    onKeyDown: (props) => (e) => {
      const {
        createComment,
        channel,
        draftText,
        setDraftText,
        scrollComments,
        resetEditor,
        focusEditor
      } = props

      const key = keycode(e)

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()

        // ignore empty.
        if (!draftText) return false

        setDraftText('')
        resetEditor('')

        createComment({channelId: channel.id, text: draftText}).then(() => {
          scrollComments()
          focusEditor()
        })

        return false
      }
    },

    handleFileDrop: (props) => async (item, monitor) => {
      const {
        channel,
        signAttachment,
        createAttachment,
        uploadAttachment,
        createComment,
        scrollComments
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
      createComment({channelId: channel.id, text: '', attachmentId: attachment.id}).then(() => {
        scrollComments()
      })
    }
  }),
  lifecycle({
    componentDidMount () {
      requestAnimationFrame(() => this.props.scrollComments());
    }
  })
)

// FIXME: More better sticky behavior.
// Date-Line separator
const DateLine = withStyles((props) => {
  const {
    styles,
    date,
    onEnter = _.noop,
    onLeave = _.noop
  } = props

  const dateLineClass = `${styles.DateLine} date-line`
  const diff = moment().diff(date, 'days')

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

  if (!date || diff === undefined) {
    return (
      <div className={dateLineClass}/>
    )
  }

  if (diff === 1) {
    return (
      <div className={dateLineClass}>
        {Trigger}
        <b>Today</b>
      </div>
    )
  } else if (diff === 2) {
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

const enhanceChatContent = compose(
  withFileDropHandler,
  withState('stickyDate', 'setStickyDate', null),
  withHandlers({
    connectDropTargetToRef: ({connectDropTarget}) => (ref) => {
      return connectDropTarget(findDOMNode(ref))
    }
  })
)

const Show = enhanceChatContent((props) => {
  const {
    channelComments,
    onKeyDown,
    onAddReaction,
    onRemoveReaction,
    onEditComment,
    onDeleteComment,
    setCommentsRef,
    setEditorInstance,
    setDraftText,
    setStickyDate,
    stickyDate,
    draftText,
    currentUser,
    isAuthenticated,
    channel,
    isOver,
    initialText,
    canDrop,
    connectDropTargetToRef,
    styles,
    showMenu
  } = props

  const {
    name,
    description
  } = channel

  let channelsClass = styles.Channels
  if (isOver && canDrop) {
    channelsClass += ' can-drop'
  }

  let lastDay = null

  return (
    <Content ref={connectDropTargetToRef}>
      <div className={channelsClass}>
        <div className={styles.DropTarget}>
          <h1>Drop file for upload.</h1>
        </div>

        <div className={styles.Header}>
          <div className={styles.HeaderRow}>
            <i onClick={() => showMenu()}><SvgIcon name="logo-small"/></i>

            <div className={styles.HeaderContent}>
              <h4 className={styles.Title}>
                <span className="icon"><FaHashTagIcon/></span>
                <span className="name">{name}</span>
              </h4>

              <div className={styles.Description}>
                <p>{description}</p>
              </div>
            </div>
          </div>

          <DateLine date={stickyDate}/>
        </div>

        <div className={styles.Content}>
          <div className={styles.Comments} ref={setCommentsRef}>
            {_.map(channelComments, (comment, i) => {
              const isFirst = i === 0
              const today = moment(comment.created_at).startOf('day')
              const hasChanged = today.diff(lastDay, 'days') > 0
              let previousDay = null

              if (hasChanged) {
                previousDay = lastDay
              }

              // set last created_at for next iteration.
              lastDay = today

              const component = (
                <React.Fragment
                  key={comment.id}
                >
                  {(isFirst || hasChanged) && (
                    // Show date line if firstRecord or dateChanged.
                    <DateLine
                      onEnter={() => setStickyDate(previousDay)}
                      onLeave={() => setStickyDate(today)}
                      date={lastDay}
                    />
                  )}

                  <Comment
                    className={styles.Comment}
                    comment={comment}
                    onEdit={() => onEditComment(comment)}
                    onDelete={() => onDeleteComment(comment)}
                    onAddReaction={onAddReaction}
                    onRemoveReaction={onRemoveReaction}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                  />
                </React.Fragment>
              )
              return component
            })}
          </div>

          <div className={styles.Footer}>
            <div className={styles.TextAreaWrapper}>
              <button><MdAddIcon className={styles.AddIcon}/></button>

              <div className="textarea">
                <Editor
                  className={styles.TextArea}
                  onKeyDown={onKeyDown}
                  onSave={(value) => setDraftText(value)}
                  instance={setEditorInstance}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
})

export default enhance((props) => {
  return (
    <Layout>
      <Sidebar/>
      <Show {...props}/>
    </Layout>
  )
})
