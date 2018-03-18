/** @jsx h */

import Plain from 'slate-plain-serializer'
import { resetKeyGenerator } from 'slate'

import { source } from 'common-tags'

export default () => {
  // https://github.com/ianstormtaylor/slate/issues/1509
  resetKeyGenerator()

  return Plain.deserialize(source`
### Getting started

- hoge
- fuga
- piyo
  
### Example
  
\`\`\`javascript
// some awesome code
console.log('bang!');
\`\`\`
  `)
}
