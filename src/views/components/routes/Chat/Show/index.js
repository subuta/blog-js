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

import Tooltip from 'src/views/components/common/Tooltip'
import Comment from 'src/views/components/common/Comment'
import DummyComment from 'src/views/components/common/Comment/Placeholder'
import Editor from 'src/views/components/common/Editor'
import SvgIcon from 'src/views/components/common/SvgIcon'
import CustomLoader from 'src/views/components/common/CustomLoader'

import storage from 'src/views/utils/storage'

import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  withPropsOnChange
} from 'recompose'

const isBrowser = typeof window !== 'undefined'

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
  withState('paging', 'setPaging', {next: 1}),
  withState('draftText', 'setDraftText', ''),
  withState('initialText', 'setInitialText', ''),
  withHandlers(() => {
    let $comments
    let editorInstance
    let $fileInput

    return {
      setCommentsRef: () => (ref) => {
        $comments = findDOMNode(ref)
      },

      setFileInputRef: () => (ref) => {
        $fileInput = findDOMNode(ref)
      },

      showFileSelection: () => () => {
        $fileInput.click()
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

      getIsFocused: () => () => {
        if (!editorInstance) return false
        return editorInstance.getIsFocused()
      },

      scrollComments: () => (position = -1) => {
        requestAnimationFrame(() => {
          if (!$comments) return

          let scrollTo = 0
          if (position === -1) {
            scrollTo = $comments.scrollHeight
          }

          $comments.scrollTop = scrollTo
        })
      }
    }
  }),
  // focusEditor on channel change.
  withPropsOnChange(
    ['channelId'],
    (props) => {
      const {
        channelId,
        resetEditor,
        focusEditor,
        setDraftText,
        setPaging,
        scrollComments
      } = props

      if (!isBrowser) return

      // init paging.
      scrollComments()
      setPaging({next: 1})

      const previousValue = storage.getItem(`comments.${channelId}.draft`)
      if (!previousValue) {
        focusEditor()
        return
      }

      setDraftText(previousValue)

      requestAnimationFrame(() => {
        resetEditor(previousValue)
        focusEditor()
      })
    }
  ),
  withHandlers({
    onSetDraftText: (props) => (value) => {
      const {
        channelId,
        setDraftText,
        getIsFocused
      } = props

      setDraftText(value)

      // backup current text to localStorage
      requestAnimationFrame(() => {
        if (!getIsFocused()) return

        if (!value) {
          // clear item if value is empty.
          storage.removeItem(`comments.${channelId}.draft`)
        } else {
          storage.setItem(`comments.${channelId}.draft`, value)
        }
      })
    },
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

    onPullToFetch: (props) => () => {
      const {
        requestComments,
        channelId,
        setPaging,
        paging
      } = props

      const {
        next,
        isLast
      } = paging

      if (isLast) return

      // Retrieve next page and save latest paging into state.
      requestComments({
        channelId,
        page: next
      }).then(data => {
        setPaging(_.omit(data, ['results']))
      })
    },

    onKeyDown: (props) => (e) => {
      const {
        onSetDraftText,
        createComment,
        channel,
        draftText,
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

        onSetDraftText('')
        resetEditor('')
        focusEditor()

        createComment({channelId: channel.id, text: draftText}).then(() => {
          scrollComments()
        })

        return false
      }
    },

    handleFileUpload: (props) => async (file) => {
      const {
        channel,
        signAttachment,
        createAttachment,
        uploadAttachment,
        createComment,
        scrollComments,
        focusEditor
      } = props

      const {name, type} = file

      // create attachment from file
      const {id, signedRequest, url} = await signAttachment({name, type})
      const attachment = await createAttachment({id, name, type, imageUrl: url})

      // then upload it to s3
      await uploadAttachment(file, signedRequest, url)

      // finally relate attachment to blank comment.
      createComment({channelId: channel.id, text: '', attachmentId: attachment.id}).then(() => {
        scrollComments()
        focusEditor()
      })
    }
  }),
  withHandlers({
    // Upload file via DnD
    handleFileDrop: (props) => async (item, monitor) => {
      const {
        handleFileUpload
      } = props

      if (!monitor) return

      const droppedFiles = monitor.getItem().files
      const file = _.first(droppedFiles)
      if (!file) return

      handleFileUpload(file)
    },

    // Upload file via Button
    onSelectFile: (props) => (e) => {
      const {
        handleFileUpload
      } = props

      const file = _.first(e.target.files)
      if (!file) return

      handleFileUpload(file)
    },
  }),
  lifecycle({
    componentDidMount () {
      // FIXME: Do I need to call these at componentDidMount?(It should be called on channeldId changes...)
      const {scrollComments, focusEditor} = this.props
      requestAnimationFrame(() => {
        scrollComments()
        focusEditor()
      })
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
    onSelectFile,
    onSetDraftText,
    onPullToFetch,
    setCommentsRef,
    setEditorInstance,
    setStickyDate,
    setFileInputRef,
    stickyDate,
    showFileSelection,
    draftText,
    currentUser,
    isAuthenticated,
    channel,
    isOver,
    isCommentProgress,
    paging,
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

  const {
    isLast = false
  } = paging

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

                  {!isLast && isFirst && (
                    // Placeholder content.
                    <div className={styles.PullToFetch}>
                      <DummyComment width={320}/>
                      <DummyComment width={260}/>
                      <DummyComment variation="attachment"/>
                      <DummyComment width={160}/>
                      <DummyComment width={300}/>

                      <Waypoint onEnter={onPullToFetch}/>

                      <div className={styles.Loader}>
                        <CustomLoader
                          label="Loading..."
                          isShow={isCommentProgress}
                          size={40}
                        />
                      </div>
                    </div>
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
              <Tooltip
                className="upload-button"
                title="Upload image"
                placement="top"
                size="small"
              >
                {/* Hidden input for file upload */}
                <input type="file"
                       ref={setFileInputRef}
                       className={styles.FileInput}
                       onChange={onSelectFile}
                       accept=".jpg, .jpeg, .png, .gif"
                />

                <button onClick={showFileSelection}>
                  <MdAddIcon className={styles.AddIcon}/>
                </button>
              </Tooltip>

              <div className="textarea">
                <Editor
                  key="editor"
                  className={styles.TextArea}
                  onKeyDown={onKeyDown}
                  onSave={onSetDraftText}
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
