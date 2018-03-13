import React from 'react';
import low from 'lowlight/lib/core';
import js from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import css from 'highlight.js/lib/languages/css';
import _ from 'lodash';

// only register expected languages.
low.registerLanguage('javascript', js);
low.registerLanguage('xml', xml);
low.registerLanguage('html', xml);
low.registerLanguage('markdown', markdown);
low.registerLanguage('css', css);

const TOKEN_MARK = 'lowlight-token';

const Code = (props) => {
  const {
    node,
    attributes,
    children,
  } = props;
  const data = node.data.toJSON();
  const { language } = data;
  return (
    <pre className={`line-numbers language-${language}`}>
      <code {...attributes} data-language={language} className="hljs">{children}</code>
    </pre>
  );
};

const CodeLine = (props) => {
  const {
    node,
    attributes,
    children,
  } = props;
  const error = node.data.get('error');

  let rowClass = 'line-numbers-rows';
  if (error) {
    rowClass += ' has-error';
  }

  return (
    <div
      className="line"
      data-key={node.key}
      {...attributes}
    >
      <span
        className={rowClass}
        contentEditable={false}
      />
      {children}
    </div>
  );
};

const createDecoration = (props) => {
  const {
    text,
    textStart,
    textEnd,
    parent,
  } = props;

  let {
    start,
    end,
  } = props;

  if (start >= textEnd || end <= textStart) {
    // Ignore, the token is not in the text
    return null;
  }

  // Shrink to this text boundaries
  start = Math.max(start, textStart);
  end = Math.min(end, textEnd);

  // Now shift offsets to be relative to this text
  start -= textStart;
  end -= textStart;

  return {
    anchorKey: text.key,
    anchorOffset: start,
    focusKey: text.key,
    focusOffset: end,
    marks: [
      {
        type: TOKEN_MARK,
        data: {
          ...parent.properties,
          tagName: parent.tagName,
        },
      }],
  };
};

const decorateNode = (language, block) => {
  const text = block.getTexts().first();
  const decorations = [];

  const { value } = low.highlight(language, text.text);

  let offset = 0;
  ((function processTree(tree, parent) {
    if (_.isArray(tree)) {
      return tree.forEach(child => processTree(child, tree));
    } else if (tree.children) {
      tree.children.forEach(child => processTree(child, tree));
    } else if (tree.value) {
      const start = offset;
      offset += tree.value.length;
      decorations.push(createDecoration({
        parent,
        text,
        textStart: 0,
        textEnd: text.text.length,
        start,
        end: offset,
      }));
    }
    return undefined;
  })(value));

  return decorations;
};

export default function LowlightPlugin(opts = {}) {
  // define language at this scope
  let language = opts.language || 'html';
  if (!language) return [];

  return {
    decorateNode: (node) => {
      if (!(node.object === 'block' && node.type === 'code_line')) {
        return false;
      }
      return decorateNode(language, node);
    },

    renderNode(props) {
      const { node } = props;
      if (node.type === 'code') {
        // if language not defined as opts.
        if (!opts.language) {
          // override language at each `code` render.
          const data = node.data.toJSON();
          language = data.language;
        }
        return <Code {...props} />;
      } else if (node.type === 'code_line') {
        return <CodeLine {...props} />;
      }
      return undefined;
    },

    renderMark(props) {
      const { mark, children } = props;
      if (mark.type !== TOKEN_MARK) {
        return undefined;
      }
      const data = mark.data.toJSON();
      const { tagName, ...rest } = data;
      const Component = tagName || 'span';
      return <Component {...rest}>{children}</Component>;
    },

    TOKEN_MARK,
  };
}
