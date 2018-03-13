/** @jsx h */

import { resetKeyGenerator } from 'slate'
import { createHyperscript } from 'slate-hyperscript';

// https://github.com/ianstormtaylor/slate/issues/1509
resetKeyGenerator()

import _ from 'lodash';

const h = createHyperscript({
  blocks: {
    code: 'code',
    code_line: 'code_line',
  },
  inlines: {},
  marks: {},
});

export default children => (
  <value>
    <document>
      <code language="markdown">
        {_.map(children, (child, _i) => <code_line>{child}</code_line>)}
      </code>
    </document>
  </value>
);
