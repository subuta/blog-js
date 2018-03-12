import { Editor, getEventTransfer } from 'slate-react'
import Html from 'slate-html-serializer'
import { Value } from 'slate'

import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import initialState from './initialState'

const serializer = new Html()

const enhance = compose(
  withState('editorState', 'setEditorState', ({value}) => {
    // TODO: valueからstateに変換する。例: Markdown -> Slate state
    return initialState
  }),
  withHandlers({
    onChange: ({setEditorState}) => ({value}) => {
      setEditorState(value)
    }
  })
)

export default enhance((props) => {
  const {
    editorState,
    onChange
  } = props
  return (
    <Editor
      placeholder="Paste in some HTML..."
      value={editorState}
      onChange={onChange}
    />
  )
})
