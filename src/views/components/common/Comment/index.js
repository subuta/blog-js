import React from 'react'
import moment from 'src/views/utils/moment'
import _ from 'lodash'

import MdCreateIcon from 'react-icons/lib/md/create'
import MdDeleteIcon from 'react-icons/lib/md/delete'
import Editor from 'src/views/components/common/Editor'

import MdKeyboardReturnIcon from 'react-icons/lib/md/keyboard-return'
import MarkdownContent from 'src/views/components/common/MarkdownContent'
import Reactions from 'src/views/components/common/Reactions'

import storage from 'src/views/utils/storage'

import withStyles from './style'

import {
  compose,
  withState,
  lifecycle,
  branch,
  renderComponent,
  withPropsOnChange, withHandlers
} from 'recompose'

import Avatar from 'src/views/components/common/Avatar'
import Tooltip from 'src/views/components/common/Tooltip'

import { toHtml } from 'src/views/utils/markdown'
import { findDOMNode } from 'react-dom'
import keycode from 'keycode/index'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  withState('isHover', 'setIsHover', false),
  withState('draftText', 'setDraftText', ({comment}) => comment.text),
  withState('html', 'setHtml', ''),
  withPropsOnChange(
    ['draftText'],
    ({draftText, comment, setHtml}) => {
      // Ignore if already rendered by server.
      if (comment.html) return
      // async render markdown to html.
      toHtml(draftText).then((html) => setHtml(html))
    }
  ),
  withHandlers(() => {
    let editorInstance
    let onSetEditorInstances = []

    return {
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

      onKeyDown: (props) => (e) => {
        const {
          comment,
          draftText,
          onLoad,
          onEndEdit = _.noop,
          onUpdate = _.noop,
        } = props

        const key = keycode(e)

        // if enter pressed(without shift-key)
        if (key === 'enter' && !e.shiftKey) {
          e.preventDefault()

          // ignore empty.
          if (!draftText) return false

          onUpdate(comment, {
            text: draftText
          })

          onEndEdit()

          return false
        } else if (key === 'esc') {
          onEndEdit()
          return false
        }

        onLoad()
      }
    }
  }),
  lifecycle({
    componentDidUpdate (prevProps) {
      const {
        resetEditor,
        isEditing,
        focusEditor,
        onLoad,
        draftText
      } = this.props

      if (prevProps.isEditing !== isEditing) {
        if (isEditing === true) {
          resetEditor(draftText)
          focusEditor()
        }

        onLoad()
      }
    }
  }),
  branch(
    ({isEditing}) => isEditing,
    renderComponent((props) => {
      const {
        onEndEdit = _.noop,
        onUpdate = _.noop,
        onKeyDown,
        setDraftText,
        setEditorInstance,
        styles,
        style,
        draftText,
        className,
        comment
      } = props

      const {
        id,
        text,
        commentedBy,
      } = comment

      let commentWrapperClass = `${styles.CommentWrapper} is-editing`

      if (className) {
        commentWrapperClass += ` ${className}`
      }

      const avatar = _.get(commentedBy, 'avatar')
      const nickname = _.get(commentedBy, 'nickname')

      return (
        <div
          className={commentWrapperClass}
          style={style}
        >
          <Avatar avatar={avatar} nickname={nickname}/>

          <div className={styles.Comment}>
            <Editor
              key="editor"
              onKeyDown={onKeyDown}
              onSave={setDraftText}
              instance={setEditorInstance}
            />

            <button
              onClick={onEndEdit}
            >
              <kbd>esc</kbd><span>for Cancel editing</span>
            </button>

            <button
              onClick={() => onUpdate(comment, {text: draftText})}
            >
              <kbd><MdKeyboardReturnIcon/></kbd><span>for Save</span>
            </button>
          </div>
        </div>
      )
    }),
    _.identity
  )
)

export default enhance((props) => {
  const {
    className,
    comment,
    styles,
    style,
    isHover,
    setIsHover,
    isAuthenticated,
    currentUser,
    onLoad = _.noop, // Will be called on content loaded.
    onEdit = _.noop,
    onDelete = _.noop,
    onAddReaction = _.noop,
    onRemoveReaction = _.noop,
  } = props

  const {
    id,
    text,
    attachment,
    commentedBy,
    reactions,
    created_at,
    updated_at,
    html
  } = comment

  const createdAt = moment(created_at).startOf('minute')
  // UpdatedAt become undefined after create.
  const updatedAt = updated_at ? moment(updated_at).startOf('minute') : createdAt

  const isEdited = !createdAt.isSame(updatedAt)

  const avatar = _.get(commentedBy, 'avatar')
  const nickname = _.get(commentedBy, 'nickname')

  let commentWrapperClass = `${styles.CommentWrapper}`
  if (isHover) {
    commentWrapperClass += ' is-hovered'
  }

  if (className) {
    commentWrapperClass += ` ${className}`
  }

  return (
    <div
      className={commentWrapperClass}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={style}
    >
      <Avatar avatar={avatar} nickname={nickname}/>

      <div className={styles.Comment}>
        <div className={styles.Nickname}>
          <span>{nickname || 'Anonymous'}</span>

          <small className={styles.CommentedAt}>{createdAt.format('A HH:mm')}</small>
        </div>

        {attachment && (
          <img
            src={attachment.imageUrl}
            alt={attachment.name}
            onLoad={onLoad}
          />
        )}

        <MarkdownContent
          className="text"
          html={html}
          onLoad={onLoad}
        />

        {isEdited && (
          <span className="edited">(edited)</span>
        )}

        <Reactions
          reactions={comment.reactions}
          onClose={() => setIsHover(false)}
          onAddReaction={(emoji) => onAddReaction(comment, emoji)}
          onRemoveReaction={(emoji) => onRemoveReaction(comment, emoji)}
          disabled={!isAuthenticated}
          currentUser={currentUser}
          mini
        />
      </div>

      {isHover && (
        <span className={styles.Actions}>
          <Reactions
            className={styles.Action}
            reactions={[]}
            onClose={() => setIsHover(false)}
            onAddReaction={(emoji) => onAddReaction(comment, emoji)}
            disabled={!isAuthenticated}
            currentUser={currentUser}
            embedded
          />

          <Tooltip
            title="Edit this comment"
            placement="top"
            size="small"
          >
            <span
              className={styles.Action}
              onClick={onEdit}
            >
              <MdCreateIcon/>
            </span>
          </Tooltip>

          <Tooltip
            title="Delete this comment"
            placement="top"
            size="small"
          >
            <span
              className={styles.Action}
              onClick={onDelete}
            >
            <MdDeleteIcon/>
          </span>
          </Tooltip>
        </span>
      )}
    </div>
  )
})
