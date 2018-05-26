import EditCode from 'slate-edit-code';

import Markdown from './Markdown';

export default (opts = {}) => {
  return [
    Markdown(opts),
    // call edit-code at last to catch event hook.
    EditCode({
      containerType: 'code',
      lineType: 'code_line',
      exitBlockType: null,
    }),
  ]
};
