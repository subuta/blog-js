// SEE: https://github.com/zestedesavoir/zmarkdown/blob/master/packages/remark-kbd/src/index.js
const whitespace = require('is-whitespace-character')
const _ = require('lodash')

const C_OPEN_BRACKET = '{'
const C_CLOSE_BRACKET = '}'
const DOUBLE_OPEN_BRACKET = '{{'
const DOUBLE_CLOSE_BRACKET = '}}'

const RE_URL = / +https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]+(\.[a-z]{0,6})?\b([-a-zA-Z0-9@:%_+.~#?&//=]*) /g;

function plugin () {
  function blockTokenizer (eat, value, silent) {
    if (
      value.charAt(0) !== C_OPEN_BRACKET ||
      value.charAt(1) !== C_OPEN_BRACKET ||
      !whitespace(value.charAt(2)) ||
      value.startsWith(C_OPEN_BRACKET.repeat(4))
    ) {
      return
    }

    let character = ''
    let previous = ''
    let preceding = ''
    let subvalue = ''
    let index = 1
    const length = value.length

    while (++index < length) {
      character = value.charAt(index)

      if (
        character === C_CLOSE_BRACKET &&
        previous === C_CLOSE_BRACKET &&
        whitespace(preceding)
      ) {
        // ignore the value contains line feed or blank space.
        if (!subvalue.match(RE_URL)) return

        /* istanbul ignore if - never used (yet) */
        if (silent) return true

        /* Eat a text-node. */
        const content = subvalue
        subvalue = DOUBLE_OPEN_BRACKET + subvalue + DOUBLE_CLOSE_BRACKET

        return eat(subvalue)({
          type: 'quoteUrl',
          data: {
            url: _.trim(content),
            isQuote: true,
          },
          children: []
        })
      }

      subvalue += previous
      preceding = previous
      previous = character
    }
  }

  const Parser = this.Parser

  // Inject inlineTokenizer
  const blockTokenizers = Parser.prototype.blockTokenizers
  const blockMethods = Parser.prototype.blockMethods
  blockTokenizers.quoteUrl = blockTokenizer
  blockMethods.splice(blockMethods.indexOf('html'), 0, 'quoteUrl')
}

export default plugin
