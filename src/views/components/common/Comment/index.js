import React from 'react'
import moment from 'src/views/utils/moment'
import _ from 'lodash'

import MdCreateIcon from 'react-icons/lib/md/create'
import MdDeleteIcon from 'react-icons/lib/md/delete'

import MarkdownContent from 'src/views/components/common/MarkdownContent'

import withStyles from './style'

import {
  compose,
  withState
} from 'recompose'

import Avatar from 'src/views/components/common/Avatar'
import Tooltip from 'src/views/components/common/Tooltip'

import { toHtml } from 'src/views/utils/markdown'

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
    onEdit = _.noop,
    onDelete = _.noop,
  } = props

  const {
    id,
    text,
    attachment,
    commentedBy
  } = comment

  const createdAt = moment(comment.createdAt).format('A HH:mm')
  const avatar = _.get(commentedBy, 'avatar')
  const nickname = _.get(commentedBy, 'nickname')

  let commentWrapperClass = styles.CommentWrapper
  if (isHover) {
    commentWrapperClass += ' is-hovered'
  }

  return (
    <div
      className={commentWrapperClass}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
      </div>

      {isHover && (
        <span className={styles.Actions}>
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
