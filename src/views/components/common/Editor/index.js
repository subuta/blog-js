import { Editor, getEventTransfer } from 'slate-react'
import { Value } from 'slate'
import xss from 'xss'

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
  withState('editorState', 'setEditorState', ({value}) => {
    // TODO: valueからstateに変換する。例: Markdown -> Slate state
    return createInitialState()
  }),
  withStyles,
  withHandlers({
    onChange: ({setEditorState}) => ({value}) => {
      // const str = Plain.serialize(value)
      // console.log('str = ', str);
      // console.log('marked(str) = ', marked(str));

      // sanitize tags
      // const html = xss(mark.data.get('value'), {
      //   stripIgnoreTag: true,
      //   whiteList: {
      //     // SEE: https://github.com/remarkjs/remark/issues/326
      //     // only allow kbd tag inside div or span or html
      //     kbd: []
      //   }
      // })

      setEditorState(value)
    }
  })
)

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
