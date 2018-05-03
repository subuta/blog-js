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

import DateLine from 'src/views/components/common/DateLine'
import Tooltip from 'src/views/components/common/Tooltip'
import Editor from 'src/views/components/common/Editor'
import SvgIcon from 'src/views/components/common/SvgIcon'

import storage from 'src/views/utils/storage'

import {
  compose,
  withState,
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
  withState('stickyDate', 'setStickyDate', null),
  withState('paging', 'setPaging', {next: 1, isLast: false}),
  withState('draftText', 'setDraftText', ''),
  withState('initialText', 'setInitialText', ''),
  withHandlers(() => {
    let editorInstance
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

      getIsFocused: () => () => {
        if (!editorInstance) return false
        return editorInstance.getIsFocused()
      },

      scrollComments: () => (position = -1) => {
        console.log('scroll!')
        // requestAnimationFrame(() => {
        //   if (!$comments) return
        //
        //   let scrollTo = 0
        //   if (position === -1) {
        //     scrollTo = $comments.scrollHeight
        //   }
        //
        //   $comments.scrollTop = scrollTo
        // })
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

      setPaging({next: 1, isLast: false})

      scrollComments()

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

      if (isLast) return

      // Retrieve next page and save latest paging into state.
      requestComments({
        channelId,
        page: next
      }).then(data => {
        setPaging(_.omit(data, ['results']))
      })
    },

    // onUpdateComment: ({updateComment}) => (comment) => {
    //   console.log('edit!', comment)
    // },

    onDeleteComment: ({deleteComment}) => (comment) => {
      deleteComment(comment.id, comment)
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
    stickyDate,
    showFileSelection,
    onPullToFetch,
    onDeleteComment,
    currentUser,
    isAuthenticated,
    channel,
    isOver,
    isCommentProgress,
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
          <Comments
            className={styles.Comments}
            comments={channelComments}
            hasNext={!isLast}
            isProgress={isCommentProgress}
            loadNext={onPullToFetch}
            onDateChange={setStickyDate}
            // onUpdate={() => onUpdateComment(comment)}
            onDelete={onDeleteComment}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
          />

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
