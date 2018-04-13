import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import withStyles from './style'

import MdInsertEmoticonIcon from 'react-icons/lib/md/insert-emoticon'
import EmojiPicker from 'src/views/components/common/EmojiPicker'
import Tooltip from 'src/views/components/common/Tooltip'

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
    isShowEmojiPicker,
    setIsHover,
    setIsShowEmojiPicker,
    setButtonRef,
    getButtonRef
  } = props

  let reactionsClass = styles.Reactions
  if (isHover) {
    reactionsClass += ' is-hovered'
  }
  return (
    <div
      className={reactionsClass}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Tooltip
        title="Add reaction"
        placement="top"
        size="small"
      >
        <button
          className={styles.ReactionButton}
          ref={setButtonRef}
          onClick={() => setIsShowEmojiPicker(true)}
        >
          <MdInsertEmoticonIcon/>
        </button>
      </Tooltip>

      <EmojiPicker
        referenceNode={getButtonRef()}
        onSelect={(emoji) => console.log('emoji = ', emoji)}
        onClose={() => setIsShowEmojiPicker(false)}
        isShow={isShowEmojiPicker}
      />
    </div>
  )
})
