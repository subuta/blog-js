import transformer from './transformer'
import parser from './parser'
import handler from './handler'

export {
  handler
}

export default function plugin (settings) {
  parser.call(this, settings)
  // return transformer(settings)
  return transformer(settings)
}
