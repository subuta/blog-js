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

    const scrollToRow = (rowIndex) => {
      if (listRef) {
        listRef.scrollToRow(rowIndex)
      }
    }

    // FIXME: More better way to expose editor api.
    instance({
      scrollToRow
    })

    return {
      setContainerRef: () => (ref) => {
        containerRef = findDOMNode(ref)
      },

      setLastScrollTop: () => (scrollTop) => {
        lastScrollTop = scrollTop
      },

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

    onAddReaction: ({addReaction, comments, refresh}) => (comment, emoji) => {
      const rowIndex = _.findIndex(comments, ['id', comment.id])

      addReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      }).then(() => refresh(rowIndex))
    },

    onRemoveReaction: ({removeReaction, comments, refresh}) => (comment, emoji) => {
      const rowIndex = _.findIndex(comments, ['id', comment.id])

      removeReaction(comment.id, {
        channelId: comment.channelId,
        emoji
      }).then(() => refresh(rowIndex))
    }
  }),
  withHandlers({
    rowRenderer: (props) => (rowProps) => {
      const {
        hasNext = true,
        comments = [],
        onDateChange,
        onUpdate,
        onDelete,
        onAddReaction,
        onRemoveReaction,
        getCache,
        styles,
        isAuthenticated,
        isRowLoaded,
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
                  date={today}
                />
              )}

              {(!isFirst && hasChanged) && (
                // Show date line if dateChanged.
                <DateLine
                  onEnter={() => onDateChange(lastDay)}
                  onLeave={() => onDateChange(today)}
                  date={today}
                />
              )}

              <Comment
                key={key}
                className={styles.Comment}
                comment={comment}
                onAddReaction={onAddReaction}
                onRemoveReaction={onRemoveReaction}
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
    isInitialized,
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

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isProgress
    ? () => {}
    : loadNext

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
        loadMoreRows={() => loadMoreRows()}
        rowCount={rowCount}
      >
        {({onRowsRendered, registerChild}) => (
          <List
            ref={(_ref) => {
              registerChild(_ref)
              setListRef(_ref)
            }}
            onScroll={(props) => setLastScrollTop(props.scrollTop)}
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
