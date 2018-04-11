import { Editor, getEventTransfer } from 'slate-react'
import _ from 'lodash'
import keycode from 'keycode'

import plugins from './plugins'
import Plain from 'slate-plain-serializer'

import withStyles from './style'

import EmojiAutoComplete from 'src/views/components/common/EmojiAutoComplete'
import EmojiPicker from 'src/views/components/common/EmojiPicker'

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
  withHandlers(function ({ setEmojiFilter }) {
    let draftEmoji = ''

    const ignoredKeys = ['up', 'down', 'enter', 'esc']

    const resetDraftEmoji = () => {
      draftEmoji = ''
      setEmojiFilter('')
    }

    return {
      onKeyDown: (props) => (e) => {
        const {
          setEmojiFilter
        } = props

        if (_.includes(ignoredKeys, keycode(e))) return

        if (e.key === ':') {
          // clear draftEmoji
          return draftEmoji = e.key
        } else if (draftEmoji && /^\w$/.test(e.key)) {
          draftEmoji += e.key
        } else if (keycode(e) === 'backspace') {
          draftEmoji = draftEmoji.slice(0, -1)
        } else {
          return resetDraftEmoji()
        }

        setEmojiFilter(draftEmoji)
      },

      onSelectEmojiPicker: (props) => (emoji, e) => {
        const {
          editorState,
          onChange
        } = props

        const change = editorState.change()
        const nextState = change
          .collapseToEnd()
          .insertText(emoji.colons)

        onChange(nextState)
      },

      onSelectEmojiAutoComplete: (props) => (emoji, e) => {
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

        return resetDraftEmoji()
      }
    }
  })
)

// TODO: add Non-inline node preview(eg: Table && Katex
//       ブロック表示されるnodeのプレビュー機能を足す。
export default enhance((props) => {
  const {
    className,
    anchorNode,
    editorState,
    onChange,
    onKeyDown,
    onSelectEmojiPicker,
    onSelectEmojiAutoComplete,
    emojiFilter,
    styles
  } = props

  let editorWrapperClass = styles.EditorWrapper
  if (className) {
    editorWrapperClass += ` ${className}`
  }

  return (
    <div className={editorWrapperClass}>
      <EmojiAutoComplete
        referenceNode={anchorNode}
        value={emojiFilter}
        onSelect={onSelectEmojiAutoComplete}
      />

      <EmojiPicker
        referenceNode={anchorNode}
        onSelect={onSelectEmojiPicker}
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
