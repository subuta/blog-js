import { Editor, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import { toHtml } from 'src/views/utils/markdown'

import plugins from './plugins'
import Plain from 'slate-plain-serializer'

import withStyles from './style'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import createInitialState from './initialState'

const enhance = compose(
  withState('editorState', 'setEditorState', ({value}) => createInitialState(value)),
  withStyles,
  withHandlers({
    onChange: ({setEditorState}) => ({value}) => {
      const str = Plain.serialize(value)

      console.log('str = ', str);
      console.log('html = ', toHtml(str));

      setEditorState(value)
    }
  })
)

// TODO: add emoji-input.
// TODO: add Non-inline node preview(eg: Table && Katex
//       ブロック表示されるnodeのプレビュー機能を足す。
export default enhance((props) => {
  const {
    editorState,
    onChange,
    styles
  } = props
  return (
    <Editor
      placeholder='Paste in some HTML...'
      className={styles.Editor}
      value={editorState}
      plugins={plugins}
      spellCheck={false}
      onChange={onChange}
    />
  )
})
