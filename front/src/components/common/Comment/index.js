import React from 'react'
import moment from 'src/utils/moment'
import _ from 'lodash'

import withStyles from './style'

import Avatar from 'src/components/common/Avatar'

export default withStyles((props) => {
  const {comment, styles} = props

  const {
    id,
    text,
    attachment,
    commentedBy
  } = comment

  const createdAt = moment(comment.createdAt).format('A HH:mm')
  const avatar = _.get(commentedBy, 'avatar')
  const nickname = _.get(commentedBy, 'nickname')

  return (
    <div className={styles.CommentWrapper}>
      <Avatar avatar={avatar} nickname={nickname} />

      <div className={styles.Comment}>
        <div className={styles.Nickname}>
          <span>{nickname || 'Anonymous'}</span>

          <small className={styles.CommentedAt}>{createdAt}</small>
        </div>

        {attachment && (
          <img src={attachment.url} alt={attachment.name} />
        )}
        <p>{text}</p>
      </div>
    </div>
  )
})
