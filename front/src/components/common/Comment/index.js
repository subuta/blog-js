import React from 'react'
import moment from 'src/utils/moment'
import _ from 'lodash'

import classes from './style'

import Avatar from 'src/components/common/Avatar'

export default ({comment}) => {
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
    <div className={classes.CommentWrapper}>
      <Avatar avatar={avatar} nickname={nickname} />

      <div className={classes.Comment}>
        <div className={classes.Nickname}>
          <span>{nickname || 'Anonymous'}</span>

          <small className={classes.CommentedAt}>{createdAt}</small>
        </div>

        {attachment && (
          <img src={attachment.url} alt={attachment.name} />
        )}
        <p>{text}</p>
      </div>
    </div>
  )
}
