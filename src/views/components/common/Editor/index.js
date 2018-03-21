import { Editor, getEventTransfer } from 'slate-react'
import _ from 'lodash'
import keycode from 'keycode'

import plugins from './plugins'
import Plain from 'slate-plain-serializer'

import withStyles from './style'

import EmojiAutoComplete from 'src/views/components/common/EmojiAutoComplete'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import createInitialState from './initialState'

const RE_EMOJI_LIKE = /^:[\w+\-1-:]+/

const enhance = compose(
  withState('anchorNode', 'setAnchorNode', null),
  withState('emojiFilter', 'setEmojiFilter', ''),
  withState('editorState', 'setEditorState', ({value}) => createInitialState(value)),
  withStyles,
  withHandlers(function () {
    const findAnchorNode = (selection) => {
      let anchorNode = selection.anchorNode
      if (anchorNode.nodeType === Node.TEXT_NODE) {
        anchorNode = anchorNode.parentNode
      }
      return anchorNode
    }

    return {
      onChange: ({setEditorState, setAnchorNode, onSave = _.noop}) => ({value}) => {
        // get and set current cursor Node to state.
        const selection = window.getSelection()
        selection.anchorNode && setAnchorNode(findAnchorNode(selection))

        setEditorState(value)
        onSave(Plain.serialize(value))
      }
    }
  }),
  withHandlers(function () {
    let draftEmoji = ''

    return {
      onKeyDown: ({ setEmojiFilter }) => (e) => {
        if (e.key === ':') {
          // clear draftEmoji
          return draftEmoji = e.key
        } else if (draftEmoji && /^\w$/.test(e.key)) {
          draftEmoji += e.key
        } else if (keycode(e) === 'backspace') {
          draftEmoji = draftEmoji.slice(0, -1)
        } else {
          draftEmoji = ''
          setEmojiFilter('')
        }

        // Mac like emoji-shortcut.
        if (keycode(e) === 'space' && e.ctrlKey && e.metaKey) {
          e.preventDefault();
          draftEmoji = ':dummy'
          // Cancel autoComplete.
        } else if (keycode(e) === 'esc') {
          e.preventDefault();
          draftEmoji = ''
        }

        setEmojiFilter(draftEmoji)
      },

      onSelectEmoji: (props) => (emoji, e) => {
        const {
          editorState,
          onChange,
          setEmojiFilter,
          emojiFilter
        } = props

        const removeIfNecessary = (change) => {
          const { value } = change
          const { anchorBlock } = value

          // Remove emojiFilter text if text included at current row.
          if (_.endsWith(anchorBlock.text, emojiFilter)) {
            change.deleteBackward(emojiFilter.length)
          }
        }

        const change = editorState.change()
        const nextState = change
          .collapseToEnd()
          .call(removeIfNecessary)
          .insertText(emoji.colons)

        onChange(nextState)
        setEmojiFilter('')
      }
    }
  })
)

// TODO: add Non-inline node preview(eg: Table && Katex
//       ブロック表示されるnodeのプレビュー機能を足す。
export default enhance((props) => {
  const {
    anchorNode,
    editorState,
    onChange,
    onKeyDown,
    onSelectEmoji,
    emojiFilter,
    styles
  } = props

  return (
    <div className={styles.EditorWrapper}>
      <EmojiAutoComplete
        referenceNode={anchorNode}
        isShow={emojiFilter.length >= 3}
        onSelect={onSelectEmoji}
      />

      <Editor
        placeholder='Paste in some HTML...'
        className={styles.Editor}
        value={editorState}
        plugins={plugins}
        spellCheck={false}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
})
