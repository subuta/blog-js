import EditCode from 'slate-edit-code';
// import Lowlight from './Lowlight';

export default [
  // Lowlight(),
  // call edit-code at last to catch event hook.
  EditCode({
    containerType: 'code',
    lineType: 'code_line',
    exitBlockType: null,
  }),
];
