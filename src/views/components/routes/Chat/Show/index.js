import React from 'react'
import { findDOMNode } from 'react-dom'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

const {FILE} = NativeTypes

import Head from 'next/head'

import _ from 'lodash'
import keycode from 'keycode'

import MdAddIcon from 'react-icons/lib/md/add'
import MdCloseIcon from 'react-icons/lib/md/close'
import MdArrowDownwardIcon from 'react-icons/lib/md/arrow-downward'

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

import {
  staticFolder,
  baseUrl,
  fbAppId,
  twitterSite
} from 'src/views/constants/config'

import moment from 'src/views/utils/moment'
import storage from 'src/views/utils/storage'
import {
  EventCommentCreated,
  EventCommentTyping,
  EventCommentReactionCreated,
  EventCommentReactionDeleted
} from 'src/api/constants/config'

import {
  compose,
  withState,
  withHandlers,
  withProps,
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

      scrollComments: ({channelComments}) => (isForced = true) => {
        if (!commentsInstance) return
        return commentsInstance.scrollToRow(channelComments.length, isForced)
      },

      refreshComments: () => () => {
        if (!commentsInstance) return
        return commentsInstance.refresh()
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

    onEventCommentCreated: (props) => ({comment}) => {
      const {
        appendChannelComment,
        scrollComments,
        setUnreadComment,
        currentUser,
        channelId
      } = props

      appendChannelComment(comment)

      // Skip unread for own comment naturally ;)
      if (comment.commentedById === _.get(currentUser, 'id')) {
        return scrollComments()
      }

      // If commented to other channel of user scrolls page manually.
      const isCommentedToThisChannel = comment.channelId === channelId
      if (!isCommentedToThisChannel || !scrollComments(false)) {
        setUnreadComment(comment.channelId, comment.id)
      }
    },

    onEventCommentTyping: ({setEditingUsers, removeEditingUser, currentUser}) => ({channelId, by}) => {
      // Skip your typing naturally ;)
      if (by.id === _.get(currentUser, 'id')) return

      setEditingUsers(channelId, by)
      _.delay(() => removeEditingUser(channelId, by), 1000 * 10)
    },

    onEventCommentReactionCreated: ({setChannelComment, refreshComments, currentUser}) => ({reaction, comment}) => {
      // Skip your typing naturally ;)
      if (comment.commentedById === _.get(currentUser, 'id')) return

      setChannelComment(comment)
      refreshComments()
    },

    onEventCommentReactionDeleted: ({setChannelComment, refreshComments, currentUser}) => ({reaction, comment}) => {
      // Skip your typing naturally ;)
      if (comment.commentedById === _.get(currentUser, 'id')) return

      setChannelComment(comment)
      refreshComments()
    }
  }),
  withHandlers((props) => {
    const {
      onEventCommentCreated,
      onEventCommentTyping,
      onEventCommentReactionCreated,
      onEventCommentReactionDeleted
    } = props

    let unsubscribe = _.noop
    let sse = null

    return {
      subscribeStream: () => async () => {
        if (!isBrowser) return

        sse = await import('src/views/utils/sse')

        // Subscribe events
        sse.subscribe(EventCommentCreated, onEventCommentCreated)
        sse.subscribe(EventCommentTyping, onEventCommentTyping)
        sse.subscribe(EventCommentReactionCreated, onEventCommentReactionCreated)
        sse.subscribe(EventCommentReactionDeleted, onEventCommentReactionDeleted)

        unsubscribe = () => {
          // Unsubscribe events
          sse.unsubscribe(EventCommentCreated, onEventCommentCreated)
          sse.unsubscribe(EventCommentTyping, onEventCommentTyping)
          sse.unsubscribe(EventCommentReactionCreated, onEventCommentReactionCreated)
          sse.unsubscribe(EventCommentReactionDeleted, onEventCommentReactionDeleted)
        }
      },

      broadcast: () => (...args) => {
        if (!isBrowser || !sse) return Promise.resolve()
        sse.broadcast.apply(null, args)
      },

      unsubscribeStream: () => () => {
        if (!isBrowser || !sse) return
        unsubscribe()
      }
    }
  }),
  withHandlers({
    notifyTyping: ({broadcast, channelId}) => () => {
      broadcast(EventCommentTyping, {
        channelId
      })
    }
  }),
  withPropsOnChange(
    ['notifyTyping'],
    ({notifyTyping}) => {
      return {
        notifyTyping: _.debounce(notifyTyping, 1000 * 10, {leading: true})
      }
    }
  ),
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

    onDeleteComment: ({deleteComment}) => (comment) => {
      return deleteComment(comment.id, comment)
    },

    scrollToUnreadComment: ({removeUnreadComment, channelId, scrollComments}) => () => {
      removeUnreadComment(channelId)
      scrollComments()
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
        notifyTyping,
        notify
      } = props

      const key = keycode(e)

      // Publish typing event on type.
      notifyTyping()

      // if enter pressed(without shift-key)
      if (key === 'enter' && !e.shiftKey) {
        e.preventDefault()

        // ignore empty.
        if (!draftText) return false

        onSetDraftText('')
        resetEditor('')
        focusEditor()

        createComment({channelId: channel.id, text: draftText}).catch((err) => {
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
  lifecycle({
    componentWillMount () {
      const {
        subscribeStream,
        setUnreadComment
      } = this.props

      subscribeStream()

      _.each(storage.keys('unreadCommentId'), (key) => {
        const channelId = _.last(_.split(key, '.'))
        setUnreadComment(channelId, Number(storage.getItem(key)))
      })
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
    removeUnreadComment,
    scrollToUnreadComment,
    onPullToFetch,
    onUpdateComment,
    onDeleteComment,
    currentUser,
    isAuthenticated,
    channel,
    isOver,
    editingUsers,
    channelId,
    isCommentProgress,
    isEditorFocused,
    paging,
    canDrop,
    connectDropTargetToRef,
    styles,
    unreadComments,
    unreadCommentIndex,
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

  const unreadCommentFrom = _.get(_.first(unreadComments), 'created_at') && moment(_.get(_.first(unreadComments), 'created_at')).format('HH:mm on MMMM Do')

  let whoIsTyping = ''
  if (editingUsers.length === 1) {
    whoIsTyping = _.get(editingUsers, [0, 'nickname'], '')
  } else if (editingUsers.length > 1) {
    whoIsTyping = 'Several people'
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
          {unreadCommentFrom && (
            <div className={styles.ChannelNotification}>
              <span className="jump" onClick={scrollToUnreadComment}><MdArrowDownwardIcon/> Jump</span>
              <span className="date" onClick={() => removeUnreadComment(channelId)}>
                {unreadComments.length} new Message since {unreadCommentFrom}
                {/*{unreadComments.length} new Message since 21:04 on May 8th*/}
              </span>
              <span className="close" onClick={() => removeUnreadComment(channelId)}><MdCloseIcon/></span>
            </div>
          )}

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
              onScrollBottom={() => {
                // Mark as read when reaches to page bottom.
                removeUnreadComment(channelId)
              }}
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
              unreadCommentIndex={unreadCommentIndex}
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

            <div className={styles.ChannelSubNotification}>
              {whoIsTyping && (
                <span><b>{whoIsTyping}</b> typing ...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Content>
  )
})

export default enhance((props) => {
  const {
    unreadComments,
    channel
  } = props

  let title = `#${channel.name} | sub-labo chat`
  if (unreadComments.length > 0) {
    title = `* ${title}`
  }

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${baseUrl}/c/${channel.name}`} />
        <meta property="og:image" content={`${baseUrl}${staticFolder}/assets/images/ogp.png`} />
        <meta property="og:site_name" content="sub-labo.com" />
        <meta property="og:description" content={`sub-labo chat channel of #${channel.name} related things`} />
        <meta property="fb:app_id" content={fbAppId} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={twitterSite} />
      </Head>
      <Sidebar/>
      <Show {...props}/>
    </Layout>
  )
})
