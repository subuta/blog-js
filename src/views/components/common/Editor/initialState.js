import { resetKeyGenerator } from 'slate'
import Plain from 'slate-plain-serializer'

import { source } from 'common-tags'

// https://github.com/ianstormtaylor/slate/issues/1509
resetKeyGenerator()

export default Plain.deserialize(source`
  Slate is flexible enough to add **decorators** that can format text based on its content. For example, this editor has **Markdown** preview decorators on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.\\n## Try it out!\\nTry it out for yourself!
`)
