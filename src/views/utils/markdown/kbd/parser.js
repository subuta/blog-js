// SEE: https://github.com/zestedesavoir/zmarkdown/blob/master/packages/remark-kbd/src/index.js
const whitespace = require('is-whitespace-character')

const C_PIPE = '|'
const DOUBLE = '||'

function locator (value, fromIndex) {
  return value.indexOf(DOUBLE, fromIndex)
}

function plugin () {
  function inlineTokenizer (eat, value, silent) {
    if (
      !this.options.gfm ||
      value.charAt(0) !== C_PIPE ||
      value.charAt(1) !== C_PIPE ||
      value.startsWith(C_PIPE.repeat(4)) ||
      whitespace(value.charAt(2))
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
        character === C_PIPE &&
        previous === C_PIPE &&
        (!preceding || !whitespace(preceding))
      ) {

        /* istanbul ignore if - never used (yet) */
        if (silent) return true

        /* Eat a text-node. */
        subvalue = DOUBLE + subvalue + DOUBLE

        return eat(subvalue)({type: 'kbd', value: subvalue})
      }

      subvalue += previous
      preceding = previous
      previous = character
    }
  }

  inlineTokenizer.locator = locator

  const Parser = this.Parser

  // Inject inlineTokenizer
  const inlineTokenizers = Parser.prototype.inlineTokenizers
  const inlineMethods = Parser.prototype.inlineMethods
  inlineTokenizers.kbd = inlineTokenizer
  inlineMethods.splice(inlineMethods.indexOf('strong'), 0, 'kbd')
}

export default plugin
