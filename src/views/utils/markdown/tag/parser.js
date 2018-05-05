import _ from 'lodash'

const C_HASH = '#'
const RE_TAG = /#([\w+!@\-1-:]+)/

tokenize.locator = locate

export default function tagParser () {
  const parser = this.Parser
  let proto

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `tag` to')
  }

  proto = this.Parser.prototype

  proto.inlineTokenizers.tag = tokenize

  proto.inlineMethods.splice(proto.inlineMethods.indexOf('strong'), 0, 'tag')
}

function tokenize (eat, value, silent) {
  /* Check if we’re at a hash. */
  if (value.charAt(0) !== C_HASH) {
    return
  }

  // ignore the value contains line feed or blank space.
  let match = RE_TAG.exec(value)
  if (!match) return

  if (silent) {
    return true
  }

  /* Eat a text-node. */
  return eat(match[0])({
    type: 'tag',
    label: match[1],
    value: match[0]
  })
}

function locate (value, fromIndex) {
  return value.indexOf(C_HASH, fromIndex)
}

function isRemarkParser (parser) {
  return Boolean(parser && parser.prototype && parser.prototype.inlineTokenizers)
}
