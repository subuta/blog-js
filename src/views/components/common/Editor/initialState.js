/** @jsx h */

import Plain from 'slate-plain-serializer'
import { resetKeyGenerator } from 'slate'

import { source } from 'common-tags'

export default () => {
  // https://github.com/ianstormtaylor/slate/issues/1509
  resetKeyGenerator()

  return Plain.deserialize(source`
  Slate is flexible enough to add **decorators** that can format text based on its content. For example, this editor has **Markdown** preview decorators on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.
  ## Try it out!
  Try it out for yourself!
  `)
}
