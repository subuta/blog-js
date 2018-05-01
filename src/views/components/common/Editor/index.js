import { findDOMNode } from 'react-dom'

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
  withState('isShowEmojiPicker', 'setIsShowEmojiPicker', false),
  withState('editorState', 'setEditorState', ({initialValue = ''}) => createInitialState(initialValue)),
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
  withHandlers(function (props) {
    const {
      setEmojiFilter,
      setEditorState,
      onChange,
      instance = _.noop
    } = props

    let draftEmoji = ''
    let editorRef
    let editorState = props.editorState

    const ignoredKeys = ['up', 'down', 'enter', 'esc', 'shift']

    const resetDraftEmoji = () => {
      draftEmoji = ''
      setEmojiFilter('')
    }

    // focus on editor
    const focus = () => {
      const change = editorState.change()

      // get full text length of editor content
      const text = editorState.document.text

      const nextState = change
        .focus()
        .move(text.length)

      onChange(nextState)
    }

    // reset internal editorState.
    const reset = (initialValue = '') => {
      editorState = createInitialState(initialValue)
      setEditorState(editorState)
    }

    const getIsFocused = () => {
      return editorState.isFocused
    }

    // FIXME: More better way to expose editor api.
    instance({
      focus,
      reset,
      getIsFocused
    })

    return {
      setEditorRef: () => (ref) => {
        editorRef = findDOMNode(ref)
      },

      onKeyDown: (props) => (e) => {
        const {
          setEmojiFilter,
          setIsShowEmojiPicker,
          onKeyDown = _.noop
        } = props

        const parentResult = onKeyDown(e)
        if (parentResult !== undefined) return parentResult

        // Show EmojiPicker on mac like emoji-shortcut.
        if (keycode(e) === 'space' && e.ctrlKey && e.metaKey) {
          setIsShowEmojiPicker(true)
          e.preventDefault()
          return false
        }

        if (keycode(e) === 'esc') {
          setIsShowEmojiPicker(false)
          e.preventDefault()
          return undefined
        }

        if (_.includes(ignoredKeys, keycode(e))) return undefined

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
      },

      getIsFocused: () => getIsFocused,

      focus: () => focus
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
    isShowEmojiPicker,
    onChange,
    onKeyDown,
    onSelectEmojiPicker,
    onSelectEmojiAutoComplete,
    emojiFilter,
    setEditorRef,
    setIsShowEmojiPicker,
    setIsFocused,
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
        onClose={() => setIsShowEmojiPicker(false)}
        isShow={isShowEmojiPicker}
      />

      <Editor
        ref={setEditorRef}
        placeholder='Message'
        className={`${styles.Editor} editor`}
        value={editorState}
        plugins={plugins}
        spellCheck={false}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
})
