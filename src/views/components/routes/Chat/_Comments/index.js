import React from 'react'
import {
  compose,
  withHandlers,
  withState
} from 'recompose'

import _ from 'lodash'
import moment from 'moment'
import Waypoint from 'react-waypoint'

import DateLine from 'src/views/components/common/DateLine'
import Comment from 'src/views/components/common/Comment'
import DummyComment from 'src/views/components/common/Comment/Placeholder'
import CustomLoader from 'src/views/components/common/CustomLoader'

import {
  InfiniteLoader,
  CellMeasurer,
  CellMeasurerCache,
  List
} from 'react-virtualized'

import withStyles from './style'
import connect from './connect'

import { findDOMNode } from 'react-dom'

const enhance = compose(
  withStyles,
  connect,
  withHandlers(() => {
    let listRef

    const cache = new CellMeasurerCache({
      defaultHeight: 300,
      fixedWidth: true
    });

    return {
      setListRef: () => (ref) => {
        listRef = ref
      },

      recomputeRowHeights: () => () => {
        if (!listRef) return
        listRef.recomputeRowHeights()
      },

      getCache: () => () => cache
    }
  }),
  withHandlers({
    onAddReaction: ({addReaction}) => (comment, emoji) => {
      addReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })
    },

    onRemoveReaction: ({removeReaction}) => (comment, emoji) => {
      removeReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })
    },

    onEditComment: ({updateComment}) => (comment) => {
      console.log('edit this!');
    }
  })
)

// FROM: https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md
export default enhance((props) => {
  const {
    hasNext = true,
    isProgress = false,
    comments = [],
    setListRef,
    scrollToIndex,
    onDateChange,
    onEditComment,
    onUpdate,
    onDelete,
    onAddReaction,
    onRemoveReaction,
    getCache,
    loadNext,
    styles,
    className,
    isAuthenticated,
    currentUser,
    ...rest
  } = props

  const cache = getCache()

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNext
    ? comments.length + 1
    : comments.length

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isProgress
    ? () => {}
    : loadNext

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({index}) => !hasNext || index < comments.length

  let lastDay = null

  // Render a list item or a loading indicator.
  const rowRenderer = ({index, key, parent, style}) => {
    let content

    const isFirst = index === 0
    const comment = comments[index]

    if (!isRowLoaded({index})) {
      content = 'Loading...'
    } else {
      content = _.get(comments, [index, 'text'])
    }

    const today = moment(comment.created_at).startOf('day')
    const hasChanged = today.diff(lastDay, 'days') > 0
    let previousDay = null

    if (hasChanged) {
      previousDay = lastDay
    }

    const component = (
      <React.Fragment
        key={comment.id}
      >
        {(isFirst || hasChanged) && (
          // Show date line if firstRecord or dateChanged.
          <DateLine
            onEnter={() => onDateChange(previousDay)}
            onLeave={() => onDateChange(today)}
            date={lastDay}
          />
        )}

        {!hasNext && isFirst && (
          // Placeholder content.
          <div className={styles.PullToFetch}>
            <DummyComment width={320}/>
            <DummyComment width={260}/>
            <DummyComment variation="attachment"/>
            <DummyComment width={160}/>
            <DummyComment width={300}/>

            {/*<Waypoint onEnter={onPullToFetch}/>*/}

            <div className={styles.Loader}>
              <CustomLoader
                label="Loading..."
                isShow={isProgress}
                size={40}
              />
            </div>
          </div>
        )}

        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          <Comment
            className={styles.Comment}
            comment={comment}
            onAddReaction={onAddReaction}
            onRemoveReaction={onRemoveReaction}
            onEdit={() => onEditComment(comment)}
            onUpdate={() => onUpdate(comment)}
            onDelete={() => onDelete(comment)}
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            style={style}
          />
        </CellMeasurer>
      </React.Fragment>
    )

    // set last created_at for next iteration.
    lastDay = today

    return component
  }

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({onRowsRendered, registerChild}) => (
        <List
          ref={(ref) => {
            registerChild(ref)
            setListRef(ref)
          }}
          onRowsRendered={onRowsRendered}
          width={300}
          height={300}
          rowCount={comments.length}
          deferredMeasurementCache={cache}
          rowHeight={cache.rowHeight}
          rowRenderer={rowRenderer}
          scrollToIndex={scrollToIndex}
          className={`${styles.Comment} ${className}`}
          {...rest}
        />
      )}
    </InfiniteLoader>
  )
})
