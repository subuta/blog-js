import { Editor, getEventTransfer } from 'slate-react'
import { Value } from 'slate'

import plugins from './plugins'
import Plain from 'slate-plain-serializer'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import createInitialState from './initialState'

const enhance = compose(
  withState('editorState', 'setEditorState', ({value}) => {
    // TODO: valueからstateに変換する。例: Markdown -> Slate state
    return createInitialState()
  }),
  withHandlers({
    onChange: ({setEditorState}) => ({value}) => {
      // const str = Plain.serialize(value)
      // console.log('str = ', str);
      // console.log('marked(str) = ', marked(str));
      setEditorState(value)
    }
  })
)

export default enhance((props) => {
  const {
    editorState,
    onChange,
  } = props
  return (
    <Editor
      placeholder='Paste in some HTML...'
      value={editorState}
      plugins={plugins}
      spellCheck={false}
      onChange={onChange}
    />
  )
})
