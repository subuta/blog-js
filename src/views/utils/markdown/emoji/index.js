import transformer from './transformer'
import parser from './parser'

export default function plugin (settings) {
  parser.call(this, settings)
  return transformer(settings)
}
