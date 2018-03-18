/** @jsx h */

import Plain from 'slate-plain-serializer'
import { resetKeyGenerator } from 'slate'

import { source } from 'common-tags'

export default (value) => {
  // https://github.com/ianstormtaylor/slate/issues/1509
  resetKeyGenerator()

  return Plain.deserialize(value)
}
