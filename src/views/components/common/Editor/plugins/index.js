import EditCode from 'slate-edit-code';

// import Lowlight from './Lowlight';
import Markdown from './Markdown';

export default [
  // Lowlight(),
  Markdown(),
  // call edit-code at last to catch event hook.
  EditCode({
    containerType: 'code',
    lineType: 'code_line',
    exitBlockType: null,
  }),
];
