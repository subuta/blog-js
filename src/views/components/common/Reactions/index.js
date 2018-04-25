import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import withStyles from './style'

import _ from 'lodash'

import MdInsertEmoticonIcon from 'react-icons/lib/md/insert-emoticon'
import EmojiPicker from 'src/views/components/common/EmojiPicker'
import Tooltip from 'src/views/components/common/Tooltip'

import { Emoji } from 'emoji-mart'
import { SHEET_URL } from 'src/views/utils/markdown/emoji/transformer'

const enhance = compose(
  withStyles,
  withState('isShowEmojiPicker', 'setIsShowEmojiPicker', false),
  withState('isHover', 'setIsHover', false),
  withHandlers(() => {
    let buttonRef

    return {
      setButtonRef: () => (ref) => {
        buttonRef = ref
      },

      getButtonRef: () => () => {
        return buttonRef
      }
    }
  })
)

export default enhance((props) => {
  let {
    styles,
    isHover,
    className,
    isShowEmojiPicker,
    mini,
    embedded,
    disabled,
    setIsHover,
    setIsShowEmojiPicker,
    setButtonRef,
    getButtonRef,
    currentUser,
    onClose = _.noop,
    onAddReaction = _.noop,
    onRemoveReaction = _.noop
  } = props

  let tooltipForAddReaction = 'Add reaction'

  let reactionsClass = `${styles.Reactions} reactions`
  if (className) {
    reactionsClass += ` ${className}`
  }

  if (isHover) {
    reactionsClass += ' is-hovered'
  }

  if (mini) {
    reactionsClass += ' is-mini'
  }

  if (embedded) {
    reactionsClass += ' is-embedded'
  }

  if (_.get(props, 'reactions', []).length > 0) {
    reactionsClass += ' has-reaction'
  }

  if (disabled) {
    reactionsClass += ' is-disabled'
    tooltipForAddReaction = 'For add reaction... Please login! :)'
  }

  const reactions = _.transform(_.groupBy(props.reactions, 'emoji'), (result, value, key) => {
    let reactedBy = _.transform(_.map(value, 'reactedBy'), (_result, user) => {
      if (!user) return
      const {id, nickname} = user
      if (_.get(currentUser, 'id') === id) {
        const isOnlyMe = value.length === 1
        return _result.push('You' + (isOnlyMe ? ' (click to remove)' : ''))
      }
      _result.push(nickname)
    }, [])

    if (reactedBy.length > 1) {
      reactedBy = `${reactedBy.slice(0, reactedBy.length - 1).join(', ')} and ${_.tail(reactedBy)}`
    }

    result[key] = {
      reactedBy: reactedBy,
      count: value.length
    }
  }, {})

  return (
    <div
      className={reactionsClass}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {_.map(reactions, ({count, reactedBy}, emoji) => (
        <Tooltip
          title={`${reactedBy} reacted with ${emoji}`}
          key={emoji}
          placement="top"
          size="small"
          offset="0, 0"
        >
          <button
            className={`${styles.ReactionButton} reaction-button`}
            onClick={() => onRemoveReaction(emoji)}
          >
            <Emoji
              emoji={emoji}
              backgroundImageFn={() => SHEET_URL}
              size={mini ? 16 : 20}
            />

            <span className='counter'>{count}</span>
          </button>
        </Tooltip>
      ))}

      <Tooltip
        title={tooltipForAddReaction}
        placement="top"
        size="small"
      >
        <button
          className={`${styles.ReactionButton} add-reaction`}
          ref={setButtonRef}
          onClick={(e) => setIsShowEmojiPicker(true)}
        >
          <MdInsertEmoticonIcon/>
        </button>
      </Tooltip>

      {!disabled && isHover && (
        <EmojiPicker
          key={`t${new Date()}`}
          referenceNode={getButtonRef()}
          onSelect={onAddReaction}
          onClose={() => {
            onClose()
            setIsShowEmojiPicker(false)
          }}
          isShow={isShowEmojiPicker}
        />
      )}
    </div>
  )
})
