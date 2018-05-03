import React from 'react'
import MarkdownContent from 'src/views/components/common/MarkdownContent'

import withStyles from './style'

import Avatar from 'src/views/components/common/Avatar'

export default withStyles((props) => {
  const {
    styles,
    style,
    width,
    variation = 'comment'
  } = props

  let commentWrapperClass = styles.CommentWrapper

  return (
    <div
      className={commentWrapperClass}
      style={style}
    >
      <Avatar avatar={null} nickname={null}/>

      <div className={styles.CommentPlaceholder}>
        <div className={styles.Nickname}>
          <span className="nickname"/>

          <small className="commentedAt"/>
        </div>

        <div className={variation}
             style={{width}}
        />
      </div>
    </div>
  )
})
