import React from 'react'
import moment from 'src/views/utils/moment'
import _ from 'lodash'

import MdCreateIcon from 'react-icons/lib/md/create'
import MdDeleteIcon from 'react-icons/lib/md/delete'

import MdInsertEmoticonIcon from 'react-icons/lib/md/insert-emoticon'
import MarkdownContent from 'src/views/components/common/MarkdownContent'
import Reactions from 'src/views/components/common/Reactions'

import withStyles from './style'

import {
  compose,
  withState,
  withPropsOnChange
} from 'recompose'

import Avatar from 'src/views/components/common/Avatar'
import Tooltip from 'src/views/components/common/Tooltip'

import { toHtml } from 'src/views/utils/markdown'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  withState('isHover', 'setIsHover', false)
)

export default enhance((props) => {
  const {
    comment,
    styles,
    isHover,
    setIsHover,
    isAuthenticated,
    currentUser,
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

  let commentWrapperClass = styles.CommentWrapper
  if (isHover) {
    commentWrapperClass += ' is-hovered'
  }

  return (
    <div
      className={commentWrapperClass}
      onMouseEnter={() => requestAnimationFrame(() => setIsHover(true))}
      onMouseLeave={() => requestAnimationFrame(() => setIsHover(false))}
    >
      <Avatar avatar={avatar} nickname={nickname} size={40}/>

      <div className={styles.Comment}>
        <div className={styles.Nickname}>
          <span>{nickname || 'Anonymous'}</span>

          <small className={styles.CommentedAt}>{createdAt}</small>
        </div>

        {attachment && (
          <img src={attachment.imageUrl} alt={attachment.name}/>
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
