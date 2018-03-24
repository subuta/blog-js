import { highlight, hasRegistered } from 'src/views/utils/highlight.js';
import visit from 'unist-util-visit';

export default function transformer ({include, exclude} = {}) {
  function visitor (node) {
    const {lang} = node;
    if (
      !lang ||
      !hasRegistered(lang)  ||
      include && !~include.indexOf(lang) ||
      exclude && ~exclude.indexOf(lang)
    ) {
      return;
    }

    let {data} = node;

    if (!data) {
      node.data = data = {};
    }

    data.hChildren = highlight(lang, node.value);
    data.hProperties = data.hProperties || {};
    data.hProperties.className = [
      'hljs',
      ...data.hProperties.className || [],
      `language-${lang}`,
    ];
  }

  return tree => visit(tree, 'code', visitor);
}
