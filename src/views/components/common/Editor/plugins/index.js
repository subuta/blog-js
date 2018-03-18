import EditCode from 'slate-edit-code';

import Markdown from './Markdown';

export default [
  Markdown(),
  // call edit-code at last to catch event hook.
  EditCode({
    containerType: 'code',
    lineType: 'code_line',
    exitBlockType: null,
  }),
];
