import _ from 'lodash'

const C_COLON = ':'

tokenize.locator = locate

export default function emojiParser () {
  const parser = this.Parser
  let proto

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-gemoji` to')
  }

  proto = this.Parser.prototype

  proto.inlineTokenizers.emoji = tokenize
  proto.inlineMethods.splice(proto.inlineMethods.indexOf('strong'), 0, 'emoji')
}

function tokenize (eat, value, silent) {
  let subvalue
  let pos

  /* Check if we’re at a short-code. */
  if (value.charAt(0) !== C_COLON) {
    return
  }

  pos = value.indexOf(C_COLON, 1)

  if (pos === -1) return

  // if skin-tone specified. (eg=`:+1::skin-tone-3:`)
  if (value.charAt(pos + 1) === C_COLON) {
    pos = value.indexOf(C_COLON, pos + 2)
    if (pos === -1) return
  }

  subvalue = value.slice(1, pos)

  if (silent) {
    return true
  }

  // ignore the value contains line feed or blank space.
  if (subvalue.match(/[\s|\r?\n]/)) return

  /* Eat a text-node. */
  subvalue = C_COLON + subvalue + C_COLON

  return eat(subvalue)({type: 'emoji', value: subvalue})
}

function locate (value, fromIndex) {
  return value.indexOf(C_COLON, fromIndex)
}

function isRemarkParser (parser) {
  return Boolean(parser && parser.prototype && parser.prototype.inlineTokenizers)
}
