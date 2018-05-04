import React from 'react'
import moment from 'src/views/utils/moment'
import _ from 'lodash'

import MdCreateIcon from 'react-icons/lib/md/create'
import MdDeleteIcon from 'react-icons/lib/md/delete'
import Editor from 'src/views/components/common/Editor'

import MdInsertEmoticonIcon from 'react-icons/lib/md/insert-emoticon'
import MarkdownContent from 'src/views/components/common/MarkdownContent'
import Reactions from 'src/views/components/common/Reactions'

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
  withState('isEditing', 'setIsEditing', false),
  withState('draftText', 'setDraftText', ({comment}) => comment.text),
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

      getIsFocused: () => () => {
        if (!editorInstance) return false
        return editorInstance.getIsFocused()
      },

      onKeyDown: (props) => (e) => {
        const {
          onSetDraftText,
          draftText,
          resetEditor,
          focusEditor,
          setIsEditing
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

          setIsEditing(false)

          console.log('draftText = ', draftText)
          return false
        }
      }
    }
  }),
  lifecycle({
    componentDidMount () {
      const {
        attachment,
        onLoad = _.noop
      } = this.props

      // Call onLoad at this hook for no-attachment comment.
      if (!attachment) {
        onLoad()
      }
    },

    componentDidUpdate (prevProps) {
      const props = this.props
      if (prevProps.isEditing !== props.isEditing) {
        props.onLoad()
      }
    }
  }),
  branch(
    ({isEditing}) => isEditing,
    renderComponent((props) => {
      const {
        onKeyDown,
        onSetDraftText,
        setEditorInstance,
        styles,
        style,
        className,
        comment
      } = props

      const {
        id,
        text,
        commentedBy,
      } = comment

      let commentWrapperClass = styles.CommentWrapper

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
              onSave={onSetDraftText}
              instance={setEditorInstance}
            />
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
    setIsEditing,
    isEditing,
    setIsHover,
    isAuthenticated,
    currentUser,
    onLoad = _.noop, // Will be called on content loaded.
    onEdit = _.noop,
    onDelete = _.noop,
    onAddReaction = _.noop,
    onRemoveReaction = _.noop
  } = props

  const {
    id,
    text,
    attachment,
    commentedBy,
    reactions
  } = comment

  const createdAt = moment(comment.created_at).format('A HH:mm')
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

          <small className={styles.CommentedAt}>{createdAt}</small>
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
          html={toHtml(text)}
        />

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
              onClick={() => setIsEditing(true)}
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
