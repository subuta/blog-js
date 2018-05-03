import React from 'react'
import {
  compose,
  withHandlers,
  withState,
  lifecycle
} from 'recompose'

import _ from 'lodash'
import moment from 'moment'

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

const defaultHeight = 300
const defaultWidth = 300

const enhance = compose(
  withStyles,
  connect,
  withState('containerStyle', 'setContainerStyle', {
    height: defaultHeight,
    width: defaultWidth
  }),
  withState('isInitialized', 'setIsInitialized', false),
  withHandlers((props) => {
    const {
      setIsInitialized,
      setContainerStyle
    } = props

    let containerRef
    let unlistenResize = _.noop

    const cache = new CellMeasurerCache({
      defaultHeight,
      fixedWidth: true
    })

    const fetchContainerStyle = () => {
      if (!containerRef) return

      const computedStyle = getComputedStyle(containerRef)

      let height = containerRef.clientHeight
      let width = containerRef.clientWidth

      height -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)
      width -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

      setContainerStyle({
        height,
        width
      })
    }

    const listenResize = () => {
      const onResize = (e) => {
        fetchContainerStyle()
      }

      window.addEventListener('resize', onResize, true)
      unlistenResize = () => window.removeEventListener('resize', onResize)

      // Call once
      onResize()
    }

    return {
      setContainerRef: () => (ref) => {
        containerRef = findDOMNode(ref)
      },

      initialize: () => () => {
        listenResize()
        requestAnimationFrame(() => setIsInitialized(true));
      },

      destroy: () => () => {
        unlistenResize();
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
      console.log('edit this!')
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.initialize()
    },

    componentWillUnmount () {
      this.props.destroy()
    }
  })
)

// FROM: https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md
export default enhance((props) => {
  const {
    hasNext = true,
    isProgress = false,
    isInitialized,
    comments = [],
    setListRef,
    scrollToIndex,
    containerStyle,
    onDateChange,
    onEditComment,
    onUpdate,
    onDelete,
    onAddReaction,
    onRemoveReaction,
    setContainerRef,
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
  const rowRenderer = (props) => {
    const {
      index,
      key,
      parent,
      isScrolling,
      style
    } = props

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
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={comment.id}
        parent={parent}
        rowIndex={index}
      >
        {({measure}) => (
          <div
            key={comment.id}
            style={style}
          >
            {(isFirst || hasChanged) && (
              // Show date line if firstRecord or dateChanged.
              <DateLine
                onEnter={() => onDateChange(previousDay)}
                onLeave={() => onDateChange(today)}
                date={lastDay}
              />
            )}

            <Comment
              key={comment.id}
              className={styles.Comment}
              comment={comment}
              onAddReaction={onAddReaction}
              onRemoveReaction={onRemoveReaction}
              onEdit={() => onEditComment(comment)}
              onUpdate={() => onUpdate(comment)}
              onDelete={() => onDelete(comment)}
              onLoad={measure}
              isAuthenticated={isAuthenticated}
              currentUser={currentUser}
            />
          </div>
        )}
      </CellMeasurer>
    )

    // set last created_at for next iteration.
    lastDay = today

    return component
  }

  return (
    <div
      className={`${styles.Comments} ${className}`}
      ref={setContainerRef}
    >
      {!isInitialized && (
        // Placeholder content.
        <div className={styles.PullToFetch}>
          <DummyComment width={320}/>
          <DummyComment width={260}/>
          <DummyComment variation="attachment"/>
          <DummyComment width={160}/>
          <DummyComment width={300}/>

          <DummyComment width={320}/>
          <DummyComment width={260}/>
          <DummyComment variation="attachment"/>
          <DummyComment width={160}/>
          <DummyComment width={300}/>

          <div className={styles.Loader}>
            <CustomLoader
              label="Loading..."
              isShow={true}
              size={40}
            />
          </div>
        </div>
      )}

      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={rowCount}
      >
        {({onRowsRendered, registerChild}) => (
          <List
            ref={registerChild}
            onRowsRendered={onRowsRendered}
            height={containerStyle.height}
            width={containerStyle.width}
            rowCount={comments.length}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            // scrollToIndex={scrollToIndex}
            {...rest}
          />
        )}
      </InfiniteLoader>
    </div>
  )
})
