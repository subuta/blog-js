/** @jsx h */

import { resetKeyGenerator } from 'slate'
import h from 'slate-hyperscript'

// https://github.com/ianstormtaylor/slate/issues/1509
resetKeyGenerator()

export default (
  <value>
    <document>
      <block type="paragraph">
        A line of text in a paragraph.
      </block>
    </document>
  </value>
)
