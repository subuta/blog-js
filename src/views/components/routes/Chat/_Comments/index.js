import React from 'react'
import {
  compose,
  withHandlers,
  withState,
  withProps,
  withPropsOnChange,
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

const isBrowser = typeof window !== 'undefined'

const defaultHeight = 50
const defaultWidth = 300
const THRESHOLD = 5

// For scroll event.
const SCROLL_DOWN = 'SCROLL_DOWN'
const SCROLL_UP = 'SCROLL_UP'

const enhance = compose(
  withStyles,
  connect,
  withState('containerStyle', 'setContainerStyle', {
    height: defaultHeight,
    width: defaultWidth
  }),
  withState('isInitialized', 'setIsInitialized', false),
  withProps(({comments, hasNext}) => {
    return {
      rowCount: (hasNext ? comments.length + 1 : comments.length) || 0
    }
  }),
  withHandlers((props) => {
    const {
      setContainerStyle,
      instance = _.noop
    } = props

    let containerRef
    let listRef
    let unlistenResize = _.noop
    let lastScrollTop = -1
    let scrollDirection = SCROLL_DOWN
    let isScrolled = false
    let comments = []

    const cache = new CellMeasurerCache({
      defaultHeight,
      fixedWidth: true,
      keyMapper: (rowIndex, columnIndex) => {
        // Fallback to default keyMapper.
        return _.get(comments, [rowIndex, 'id']) || `${rowIndex}-${columnIndex}`
      }
    })

    // Get container size at DOM.
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

    // Listen for window resize.
    const listenResize = () => {
      const onResize = (e) => {
        fetchContainerStyle()
      }

      window.addEventListener('resize', onResize, true)
      unlistenResize = () => window.removeEventListener('resize', onResize)

      // Call once
      onResize()
    }

    const scrollToRow = (rowIndex, isForced = true) => {
      if (!listRef) return
      // Early return if user scrolled comments and not forced to scroll.
      if (!isForced && isScrolled) return

      listRef.scrollToRow(rowIndex)

      // return true if scrolled.
      return true
    }

    // FIXME: More better way to expose editor api.
    instance({
      scrollToRow
    })

    return {
      setContainerRef: () => (ref) => {
        containerRef = findDOMNode(ref)
      },

      setLastScrollTop: () => (scrollTop, _isScrolled) => {
        if (scrollTop < lastScrollTop) {
          scrollDirection = SCROLL_UP
        } else {
          scrollDirection = SCROLL_DOWN
        }

        lastScrollTop = scrollTop
        isScrolled = _isScrolled
      },

      getScrollDirection: () => () => scrollDirection,

      setListRef: () => (ref) => {
        listRef = ref
      },

      syncComments: (props) => () => {
        comments = props.comments
      },

      refresh: () => (rowIndex) => {
        if (cache) {
          if (rowIndex) {
            cache.clear(rowIndex, 0)
          } else {
            cache.clearAll()
          }
        }

        if (listRef) {
          listRef.recomputeRowHeights()
          listRef.scrollToPosition(lastScrollTop)
        }
      },

      scrollToRow: () => scrollToRow,

      initialize: ({comments}) => () => {
        listenResize()
      },

      destroy: () => () => {
        unlistenResize()
      },

      getCache: () => () => cache
    }
  }),
  withPropsOnChange(
    ['rowCount'],
    ({rowCount, refresh}) => {
      refresh()
    }
  ),
  withHandlers({
    // Every row is loaded except for our loading indicator row.
    isRowLoaded: ({hasNext, comments}) => ({index}) => {
      const commentIndex = hasNext ? index - 1 : index
      const comment = comments[commentIndex]

      if (hasNext) {
        return index > 0 && !!comment
      }

      return !!comment
    },

    onAddReaction: ({hasNext, addReaction, comments, refresh}) => async (comment, emoji) => {
      let rowIndex = _.findIndex(comments, ['id', comment.id])
      rowIndex = hasNext ? rowIndex + 1 : rowIndex

      await addReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })

      refresh(rowIndex)
    },

    onRemoveReaction: ({hasNext, removeReaction, comments, refresh}) => async (comment, emoji) => {
      let rowIndex = _.findIndex(comments, ['id', comment.id])
      rowIndex = hasNext ? rowIndex + 1 : rowIndex

      await removeReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      })

      refresh(rowIndex)
    },

    onUpdateComment: ({onUpdate, comments, hasNext, refresh}) => async (comment, params) => {
      let rowIndex = _.findIndex(comments, ['id', comment.id])
      rowIndex = hasNext ? rowIndex + 1 : rowIndex

      // wait for done update
      await onUpdate(comment, params)

      refresh(rowIndex)
    },

    onLoadMoreRows: ({loadNext, isProgress, comments, scrollToRow}) => () => {
      // Only load 1 page of items at a time.
      // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
      const loadMoreRows = isProgress
        ? () => Promise.resolve()
        : loadNext

      // Scroll to last row.
      loadMoreRows().then(() => scrollToRow(THRESHOLD + 1))
    }
  }),
  withHandlers({
    rowRenderer: (props) => (rowProps) => {
      const {
        hasNext = true,
        comments = [],
        onDateChange,
        onUpdateComment,
        onDelete,
        onAddReaction,
        onRemoveReaction,
        getCache,
        styles,
        onEdit,
        editingRowIndex,
        isAuthenticated,
        isRowLoaded,
        getScrollDirection,
        unreadCommentIndex,
        currentUser
      } = props

      const cache = getCache()

      const {
        key,
        parent,
        style,
        index
      } = rowProps

      const isFirst = index === 0

      if (!isRowLoaded({index})) {
        return (
          <CellMeasurer
            cache={cache}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
          >
            <DummyComment
              key={key}
              style={style}
              width={320}
            />
          </CellMeasurer>
        )
      }

      const commentIndex = hasNext ? index - 1 : index
      const comment = comments[commentIndex]
      const previousComment = comments[commentIndex - 1]

      const today = moment(comment.created_at).startOf('day')
      const lastDay = previousComment ? moment(previousComment.created_at).startOf('day') : today
      const hasChanged = today.diff(lastDay, 'days') > 0

      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          parent={parent}
          rowIndex={index}
        >
          {({measure}) => (
            <div
              key={key}
              style={style}
            >
              {isFirst && (
                // Show date line if firstRecord
                <DateLine
                  onEnter={() => onDateChange(null)}
                  onLeave={() => onDateChange(today)}
                  onBeforeMount={() => {
                    if (getScrollDirection() === SCROLL_DOWN) return
                    onDateChange(null)
                  }}
                  onBeforeUnmount={() => {
                    if (getScrollDirection() === SCROLL_UP) return
                    onDateChange(today)
                  }}
                  date={today}
                />
              )}

              {(!isFirst && hasChanged) && (
                // Show date line if dateChanged.
                <DateLine
                  onEnter={() => onDateChange(lastDay)}
                  onLeave={() => onDateChange(today)}
                  onBeforeMount={() => {
                    if (getScrollDirection() === SCROLL_DOWN) return
                    onDateChange(lastDay)
                  }}
                  onBeforeUnmount={() => {
                    if (getScrollDirection() === SCROLL_UP) return
                    onDateChange(today)
                  }}
                  date={today}
                />
              )}

              {unreadCommentIndex === commentIndex && (
                <div className={styles.NewMessagesLine}>
                  <span className="badge">new messages</span>
                </div>
              )}

              <Comment
                key={key}
                className={styles.Comment}
                comment={comment}
                onAddReaction={onAddReaction}
                onRemoveReaction={onRemoveReaction}
                onUpdate={onUpdateComment}
                onDelete={() => onDelete(comment)}
                onLoad={measure}
                onEdit={() => onEdit(index)}
                onEndEdit={() => onEdit(null)}
                isEditing={editingRowIndex === index}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
              />
            </div>
          )}
        </CellMeasurer>
      )
    }
  }),
  lifecycle({
    componentDidMount () {
      const {
        comments,
        initialize,
        refresh,
        scrollToRow,
        setIsInitialized,
        rowCount
      } = this.props

      initialize()

      isBrowser && requestAnimationFrame(() => {
        refresh()
        scrollToRow(rowCount);
        setIsInitialized(true)
      });
    },

    componentWillUnmount () {
      this.props.destroy()
    }
  })
)

// FROM: https://github.com/bvaughn/react-virtualized/blob/master/docs/creatingAnInfiniteLoadingList.md
export default enhance((props) => {
  const {
    isProgress = false,
    onScrollBottom = _.noop,
    isInitialized,
    onLoadMoreRows,
    rowCount,
    containerStyle,
    setContainerRef,
    setListRef,
    getCache,
    lastScrollTop,
    setLastScrollTop,
    loadNext,
    styles,
    comments,
    className,
    rowRenderer,
    ...rest
  } = props

  const cache = getCache()

  const isRowLoaded = isInitialized ? props.isRowLoaded : () => true

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
        loadMoreRows={onLoadMoreRows}
        rowCount={rowCount}
        threshold={THRESHOLD}
      >
        {({onRowsRendered, registerChild}) => (
          <List
            ref={(_ref) => {
              registerChild(_ref)
              setListRef(_ref)
            }}
            onScroll={({clientHeight, scrollHeight, scrollTop}) => {
              const isScrolled = scrollTop + (clientHeight / 2) < scrollHeight - clientHeight
              setLastScrollTop(scrollTop, isScrolled)

              // On scroll down to bottom of the page.
              if (clientHeight + scrollTop >= scrollHeight) {
                onScrollBottom()
              }
            }}
            onRowsRendered={onRowsRendered}
            height={containerStyle.height}
            width={containerStyle.width}
            rowCount={rowCount}
            deferredMeasurementCache={cache}
            estimatedRowSize={defaultHeight}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            scrollToAlignment="start"
            {...rest}
          />
        )}
      </InfiniteLoader>
    </div>
  )
})
