import transformer from './transformer'
import parser from './parser'
import handler from './handler'
import upgradeDom from './upgradeDom'

export {
  handler,
  upgradeDom
}

export default function plugin (settings) {
  parser.call(this, settings)
  return transformer(settings)
}
