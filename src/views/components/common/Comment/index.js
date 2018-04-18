import React from 'react'
import moment from 'src/views/utils/moment'
import _ from 'lodash'

import withStyles from './style'

import {
  compose,
  withState
} from 'recompose'

import Avatar from 'src/views/components/common/Avatar'

const enhance = compose(
  withStyles,
  withState('isHover', 'setIsHover', false)
)

export default enhance((props) => {
  const {
    comment,
    styles,
    isHover,
    setIsHover
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
      <Avatar avatar={avatar} nickname={nickname} size={40} />

      <div className={styles.Comment}>
        <div className={styles.Nickname}>
          <span>{nickname || 'Anonymous'}</span>

          <small className={styles.CommentedAt}>{createdAt}</small>
        </div>

        {attachment && (
          <img src={attachment.imageUrl} alt={attachment.name} />
        )}
        <p>{text}</p>
      </div>
    </div>
  )
})
