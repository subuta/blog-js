import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const {FILE} = NativeTypes

import _ from 'lodash'
import keycode from 'keycode'

import MdAddIcon from 'react-icons/lib/md/add'

import FaHashTagIcon from 'react-icons/lib/fa/hashtag'

import withStyles from './style'
import connect from './connect'

import Layout from 'src/views/components/layout/Layout'

import Sidebar from '../_Sidebar'
import Content from '../_Content'
import Comments from '../_Comments'

import Notifications from 'src/views/components/common/Notifications'
import DateLine from 'src/views/components/common/DateLine'
import Tooltip from 'src/views/components/common/Tooltip'
import Editor from 'src/views/components/common/Editor'
import SvgIcon from 'src/views/components/common/SvgIcon'

import storage from 'src/views/utils/storage'
import { EventCommentCreated } from 'src/api/constants/config'

import {
  compose,
  withState,
  withHandlers,
  withPropsOnChange,
  lifecycle
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

const CommentPageSize = 30

const enhance = compose(
  withStyles,
  connect,
  withState('stickyDate', 'setStickyDate', null),
  withState('editingRowIndex', 'setEditingRowIndex', null),
  withState('isEditorFocused', 'setIsEditorFocused', false),
  withState('paging', 'setPaging', ({channelComments}) => {
    return {
      next: 1,
      isLast: channelComments.length < CommentPageSize
    }
  }),
  withState('draftText', 'setDraftText', ''),
  withState('initialText', 'setInitialText', ''),
  withHandlers(() => {
    let notificationInstance

    return {
      setNotificationInstance: () => (instance) => {
        notificationInstance = instance
      },

      notify: () => (message, timeout) => {
        notificationInstance.notify(message, timeout)
      }
    }
  }),
  withHandlers(() => {
    let editorInstance
    let commentsInstance
    let $fileInput
    let onSetEditorInstances = []

    return {
      setFileInputRef: () => (ref) => {
        $fileInput = findDOMNode(ref)
      },

      showFileSelection: () => () => {
        $fileInput.click()
      },

      setEditorInstance: () => (instance) => {
        editorInstance = instance
        isBrowser && requestAnimationFrame(() => {
          // Call listeners.
          _.each(onSetEditorInstances, fn => fn(editorInstance))
          onSetEditorInstances = []
        })
      },

      setCommentsInstance: () => (instance) => {
        commentsInstance = instance
      },

      resetEditor: () => (initialValue) => {
        if (!editorInstance) {
          // Delay execution
          onSetEditorInstances.push(() => editorInstance.reset(initialValue))
          return
        }
        editorInstance.reset(initialValue)
      },

      focusEditor: () => () => {
        if (!editorInstance) {
          // Delay execution
          onSetEditorInstances.push((editorInstance) => editorInstance.focus())
          return
        }
        editorInstance.focus()
      },

      blurEditor: () => () => {
        if (!editorInstance) {
          // Delay execution
          onSetEditorInstances.push((editorInstance) => editorInstance.blur())
          return
        }
        editorInstance.blur()
      },

      scrollComments: ({channelComments}) => () => {
        if (!commentsInstance) return
        commentsInstance.scrollToRow(channelComments.length)
      }
    }
  }),
  // focusEditor on channel change.
  withPropsOnChange(
    ['channelId'],
    (props) => {
      const {
        channelId,
        channelComments,
        resetEditor,
        focusEditor,
        blurEditor,
        setDraftText,
        setPaging
      } = props

      setPaging({next: 1, isLast: channelComments.length < CommentPageSize})

      if (!isBrowser) return

      const initEditor = (value = '') => {
        setDraftText(value)
        resetEditor(value)
        focusEditor()
      }

      const previousValue = storage.getItem(`comments.${channelId}.draft`)
      if (!previousValue) {
        initEditor()
        return
      }

      initEditor(previousValue)
    }
  ),
  withHandlers({
    onSetDraftText: (props) => (value) => {
      const {
        channelId,
        setDraftText,
        isEditorFocused,
      } = props

      setDraftText(value)

      // backup current text to localStorage
      requestAnimationFrame(() => {
        if (!isEditorFocused) return

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
    onPullToFetch: (props) => (...args) => {
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

      if (isLast) return Promise.resolve()

      // Retrieve next page and save latest paging into state.
      return requestComments({
        channelId,
        page: next
      }).then(data => {
        setPaging(_.omit(data, ['results']))
        return data
      })
    },

    onUpdateComment: ({updateComment}) => (comment, params) => {
      return updateComment(comment.id, {
        ...comment,
        ...params
      })
    },

    onEventCommentCreated: ({appendChannelComment, scrollComments}) => ({comment}) => {
      appendChannelComment(comment)
      scrollComments()
    },

    onDeleteComment: ({deleteComment}) => (comment) => {
      return deleteComment(comment.id, comment)
    },

    onKeyDown: (props) => (e) => {
      const {
        onSetDraftText,
        createComment,
        channel,
        draftText,
        scrollComments,
        resetEditor,
        focusEditor,
        notify
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
        }).catch((err) => {
          if (err.status === 401) {
            notify('Log in to send comment, sorry ;)', 3000)
          }

          // Restore old comments if failed to post.
          onSetDraftText(draftText)
          resetEditor(draftText)
          focusEditor()
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
        focusEditor,
        notify
      } = props

      const {name, type} = file

      try {
        // create attachment from file
        const {id, signedRequest, url} = await signAttachment({name, type})
        const attachment = await createAttachment({id, name, type, imageUrl: url})

        // then upload it to s3
        await uploadAttachment(file, signedRequest, url)

        // finally relate attachment to blank comment.
        await createComment({channelId: channel.id, text: '', attachmentId: attachment.id}).then(() => {
          scrollComments()
          focusEditor()
        })
      } catch (err) {
        if (err.status === 401) {
          notify('Log in to upload file, sorry ;)', 3000)
        }
      }
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
  withHandlers(({onEventCommentCreated}) => {
    let unsubscribe = _.noop

    return {
      subscribeStream: () => async () => {
        if (!isBrowser) return

        const sse = await import('src/views/utils/sse')
        sse.subscribe(EventCommentCreated, onEventCommentCreated)

        unsubscribe = () => sse.unsubscribe(EventCommentCreated, onEventCommentCreated)
      },

      unsubscribeStream: () => () => {
        if (!isBrowser) return
        unsubscribe()
      }
    }
  }),
  lifecycle({
    componentWillMount () {
      this.props.subscribeStream()
    },

    componentWillUnmount () {
      this.props.unsubscribeStream()
    }
  })
)

const enhanceChatContent = compose(
  withFileDropHandler,
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
    onSelectFile,
    onSetDraftText,
    setEditorInstance,
    setStickyDate,
    setFileInputRef,
    setCommentsInstance,
    setEditingRowIndex,
    setIsEditorFocused,
    setNotificationInstance,
    editingRowIndex,
    stickyDate,
    showFileSelection,
    onPullToFetch,
    onUpdateComment,
    onDeleteComment,
    currentUser,
    isAuthenticated,
    channel,
    isOver,
    isCommentProgress,
    isEditorFocused,
    paging,
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
    isLast
  } = paging

  let channelsClass = styles.Channels
  if (isOver && canDrop) {
    channelsClass += ' can-drop'
  }

  return (
    <Content ref={connectDropTargetToRef}>
      <div className={channelsClass}>
        <div className={styles.DropTarget}>
          <h1>Drop file for upload.</h1>
        </div>

        <Notifications
          instance={setNotificationInstance}
        />

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

          {/* FIXME: stickyDate not works correctly for some conditions. */}
          <DateLine date={stickyDate}/>
        </div>

        <div className={styles.Content}>
          {channelComments.length > 0 && (
            <Comments
              className={styles.Comments}
              comments={channelComments}
              hasNext={!isLast}
              isProgress={isCommentProgress}
              loadNext={onPullToFetch}
              onDateChange={setStickyDate}
              editingRowIndex={editingRowIndex}
              onEdit={setEditingRowIndex}
              onUpdate={onUpdateComment}
              onDelete={onDeleteComment}
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              instance={setCommentsInstance}
            />
          )}

          <div className={`${styles.Footer} ${isEditorFocused ? 'is-focused' : ''}`}>
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
                  onFocus={() => setIsEditorFocused(true)}
                  onBlur={() => setIsEditorFocused(false)}
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
